const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs'); 
const User = require('../models/user');

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'Muaz_JWT_Secret_2025';


const signupUser = async (req, res) => {
  try {
    const { name, email, password, country, city } = req.body;
    if (!name || !email || !password || !country || !city) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists!' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      country,
      city,
    });
    await newUser.save();
    res.json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed!', error: err });
  }
};

// ======================== LOGIN =========================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials!' });

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful!', token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed!', error: err });
  }
};

// ======================== PROFILE =========================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found!' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err });
  }
};

// ======================== UPDATE PROFILE =========================
const updateProfile = async (req, res) => {
  try {
    const { name, email, country, city } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, country, city },
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'User not found!' });
    res.json({ message: 'Profile updated successfully!', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Profile update failed!', error: err });
  }
};

// ======================== FORGOT PASSWORD =========================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found!' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '15m' });
    const resetLink = `http://localhost:4201/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Reset Password',
      html: `<h3>Reset Your Password</h3>
      <p>Click below to reset your password (valid for 15 minutes):</p>
      <a href="${resetLink}" target="_blank">Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Reset link sent to your email!' });
  } catch (err) {
    res.status(500).json({ message: 'Email sending failed', error: err });
  }
};

// ======================== RESET PASSWORD =========================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    res.json({ message: 'Password reset successful!' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token!', error: err });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
};
