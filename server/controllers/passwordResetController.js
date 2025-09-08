const crypto = require('crypto');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const otpStore = new Map(); // In-memory store for OTPs, consider Redis for production

// Configure nodemailer transporter (use environment variables for real credentials)
let transporter;
try {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // Use Ethereal for testing if Gmail credentials not available
    console.warn('Gmail credentials not configured. Using Ethereal for testing.');
    // Create a basic transporter for now, will be replaced with Ethereal when needed
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'test@example.com', // placeholder
        pass: 'testpass', // placeholder
      },
    });
  }
} catch (error) {
  console.error('Failed to configure email transporter:', error);
  transporter = null;
}

// Configure Twilio for SMS
let twilioClient;
try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  } else {
    console.warn('Twilio credentials not configured. SMS will be logged to console only.');
    twilioClient = null;
  }
} catch (error) {
  console.error('Failed to configure Twilio client:', error);
  twilioClient = null;
}

// Generate random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via email (mocked for no credentials)
async function sendEmailOTP(email, otp) {
  if (!transporter) {
    console.log(`Mock send OTP ${otp} to email ${email} (email service not configured)`);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
  };
  await transporter.sendMail(mailOptions);
}

// Send OTP via SMS using Twilio
async function sendPhoneOTP(phone, otp) {
  if (!twilioClient) {
    console.log(`Mock SMS: OTP ${otp} to phone ${phone} (Twilio not configured)`);
    return;
  }

  try {
    // Ensure phone number is in international format
    let formattedPhone = phone;
    if (!phone.startsWith('+')) {
      // Assume Indian number if no country code
      formattedPhone = `+91${phone}`;
    }

    const message = await twilioClient.messages.create({
      body: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });

    console.log(`SMS sent successfully to ${formattedPhone}, SID: ${message.sid}`);
  } catch (error) {
    console.error('SMS sending failed:', error);
    throw new Error('Failed to send SMS');
  }
}

// Request password reset - choose email or phone, send OTP
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email && !phone) {
      return res.status(400).json({ message: 'Provide email or phone number' });
    }

    let user;
    if (email) {
      // Email is already normalized in the User model pre-save hook
      user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return res.status(404).json({ message: 'User with this email not found' });

      // Check if email service is configured
      if (!transporter) {
        return res.status(503).json({
          message: 'Email service not configured. Please contact support or use phone reset.',
          error: 'EMAIL_NOT_CONFIGURED'
        });
      }

      const otp = generateOTP();
      otpStore.set(`email-${email}`, { otp, expires: Date.now() + 10 * 60 * 1000 }); // 10 minutes expiry

      try {
        await sendEmailOTP(email, otp);
        return res.json({ message: 'OTP sent to email' });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        otpStore.delete(`email-${email}`); // Clean up OTP on failure
        return res.status(500).json({
          message: 'Failed to send email. Please try phone reset or contact support.',
          error: 'EMAIL_SEND_FAILED'
        });
      }
    } else if (phone) {
      user = await User.findOne({ 'profile.phone': phone });
      if (!user) return res.status(404).json({ message: 'User with this phone number not found' });
      const otp = generateOTP();
      otpStore.set(`phone-${phone}`, { otp, expires: Date.now() + 10 * 60 * 1000 }); // 10 minutes expiry
      await sendPhoneOTP(phone, otp);
      return res.json({ message: 'OTP sent to phone' });
    }
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP and generate password reset token (valid 30 minutes)
exports.verifyOTP = async (req, res) => {
  try {
    const { email, phone, otp } = req.body;
    if (!otp) return res.status(400).json({ message: 'OTP is required' });

    let key;
    if (email) key = `email-${email}`;
    else if (phone) key = `phone-${phone}`;
    else return res.status(400).json({ message: 'Provide email or phone number' });

    const record = otpStore.get(key);
    if (!record) return res.status(400).json({ message: 'OTP expired or not found' });
    if (record.expires < Date.now()) {
      otpStore.delete(key);
      return res.status(400).json({ message: 'OTP expired' });
    }
    if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    otpStore.delete(key);

    // Generate reset token
    const user = email
      ? await User.findOne({ email: email.toLowerCase() })
      : await User.findOne({ 'profile.phone': phone });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30m' }
    );

    res.json({ message: 'OTP verified', resetToken });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password using token
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword) {
      return res.status(400).json({ message: 'Reset token and new password are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET || 'your-secret-key');
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
