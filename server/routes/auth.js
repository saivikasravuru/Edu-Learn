const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ GET /api/auth/test
router.get('/test', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ totalUsers: users.length, users });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// ✅ POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Register:', email);

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: 'Free Member'
    });

    await newUser.save();
    console.log('✅ Registered:', email);

    res.json({
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (e) {
    console.log('Register error:', e.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login:', email);

    const user = await User.findOne({
      email: email.toLowerCase(),
      password: password
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('✅ Login success:', email);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (e) {
    console.log('Login error:', e.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Forgot password:', email);

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'Email not found!' });
    }

    console.log('✅ OTP sent to:', email);
    res.json({
      success: true,
      message: 'OTP sent successfully',
      otp: '1234'
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log('Reset password:', email);

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    console.log('✅ Password updated for:', email);
    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;