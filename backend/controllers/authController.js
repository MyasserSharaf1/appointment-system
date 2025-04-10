// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateCaptcha } = require('../utils/captcha');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, captchaText } = req.body;

    // Verify captcha
    if (req.session.captcha !== captchaText) {
      return res.status(400).json({ success: false, error: 'Invalid captcha' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'patient'
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password, captchaText } = req.body;

    // Verify captcha
    if (req.session.captcha !== captchaText) {
      return res.status(400).json({ success: false, error: 'Invalid captcha' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get captcha
// @route   GET /api/auth/captcha
// @access  Public
exports.getCaptcha = async (req, res) => {
  const { text, data } = generateCaptcha();
  req.session.captcha = text;
  res.type('svg');
  res.status(200).send(data);
};

// Helper to send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};