const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  requestPasswordReset,
  verifyOTP,
  resetPassword,
} = require('../controllers/passwordResetController');

const router = express.Router();

// Request password reset - send OTP to email or phone
router.post('/request', [
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await requestPasswordReset(req, res);
});

// Verify OTP and get reset token
router.post('/verify-otp', [
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await verifyOTP(req, res);
});

// Reset password using reset token
router.post('/reset', [
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await resetPassword(req, res);
});

module.exports = router;
