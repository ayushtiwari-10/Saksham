const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const register = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['student', 'teacher', 'admin']).withMessage('Invalid role'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, role = 'student' } = req.body;
      console.log('Registration attempt for email:', email);

      // Check if user exists
      const existingUser = await User.findOne({ email });
      console.log('Existing user check:', existingUser ? 'User exists' : 'User does not exist');
      if (existingUser) {
        console.log('Registration failed: User already exists for email:', email);
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create user
      const user = new User({ name, email, password, role });
      await user.save();
      console.log('User saved successfully with ID:', user._id);

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

const login = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      // Email is already normalized in the User model pre-save hook
      const normalizedEmail = email.toLowerCase();
      console.log('Login attempt for email:', email, '(normalized:', normalizedEmail + ')');

      // Find user
      const user = await User.findOne({ email: normalizedEmail });
      console.log('User found:', user ? 'Yes' : 'No');
      if (!user) {
        console.log('User not found for email:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      console.log('Password match:', isMatch ? 'Yes' : 'No');
      if (!isMatch) {
        console.log('Password mismatch for user:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          surveyCompleted: user.surveyCompleted,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

module.exports = {
  register,
  login,
};
