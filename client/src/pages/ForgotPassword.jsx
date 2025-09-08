import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1); // 1: Enter email/Use account email, 2: Enter OTP, 3: Reset password
  const [method, setMethod] = useState('email'); // Default to email
  const [formData, setFormData] = useState({
    email: isAuthenticated ? user?.email : '',
    phone: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMethodSelect = async (selectedMethod) => {
    setMethod(selectedMethod);
    setStep(2);
    setError('');
    setMessage('');

    // Send OTP request
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/password-reset/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [selectedMethod]: formData[selectedMethod]
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        // Handle specific error types
        if (data.error === 'EMAIL_NOT_CONFIGURED') {
          setError('Email service is not configured. Please use phone number or contact support.');
        } else if (data.error === 'EMAIL_SEND_FAILED') {
          setError('Failed to send email. Please use phone number or contact support.');
        } else {
          setError(data.message || 'Failed to send OTP');
        }
        setStep(1);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setStep(1);
    }
    setLoading(false);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/password-reset/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [method]: formData[method],
          otp: formData.otp
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResetToken(data.resetToken);
        setStep(3);
        setMessage('OTP verified successfully. Enter your new password.');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/password-reset/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resetToken,
          newPassword: formData.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successful! You can now login with your new password.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setStep(1);
    setMethod('');
    setFormData({
      email: '',
      phone: '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    });
    setResetToken('');
    setMessage('');
    setError('');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>

        {step === 1 && (
          <div className="method-selection">
            {isAuthenticated ? (
              <div className="account-reset">
                <p>Send a password reset code to your account email:</p>
                <div className="email-display">
                  <strong>{user?.email}</strong>
                </div>
                <button
                  onClick={() => handleMethodSelect('email')}
                  disabled={loading}
                  className="method-btn primary-btn"
                >
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </div>
            ) : (
              <div>
                <p>Enter your email address to reset your password:</p>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <button
                    onClick={() => handleMethodSelect('email')}
                    disabled={!formData.email || loading}
                    className="method-btn"
                  >
                    {loading ? 'Sending...' : 'Send Reset Code'}
                  </button>
                </div>

                <div className="divider">OR</div>

                <div className="input-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <button
                    onClick={() => handleMethodSelect('phone')}
                    disabled={!formData.phone || loading}
                    className="method-btn"
                  >
                    {loading ? 'Sending...' : 'Send OTP to Phone'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleOTPSubmit} className="otp-form">
            <p>Enter the 6-digit OTP sent to your {method}:</p>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleInputChange}
              maxLength="6"
              required
            />
            <div className="button-group">
              <button type="submit" disabled={loading || formData.otp.length !== 6}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button type="button" onClick={resetForm} className="back-btn">
                Back
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset} className="password-form">
            <p>Enter your new password:</p>
            <input
              type="password"
              name="newPassword"
              placeholder="New password (min 6 characters)"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
              <button type="button" onClick={resetForm} className="back-btn">
                Back
              </button>
            </div>
          </form>
        )}

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="back-to-login">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
