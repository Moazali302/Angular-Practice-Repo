const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

// ✅ SIGNUP
const signupUser = async (req, res) => {
  try {
    const { name, email, password,country, city } = req.body;

    if (!name || !email || !password || !country  || !city) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    const user = new User({ name, email, password,country, city });
    await user.save();

    res.json({ message: 'Signup successful!' });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed!', details: error.message });
  }
};

// ✅ LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed!', details: error.message });
  }
};

// ✅ PROFILE
const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ✅ UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const { name, email,country, city } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { name, email, city },
      { new: true }
    ).select('-password');

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Profile update failed', error: err.message });
  }
};

// ✅ FORGOT PASSWORD (send email)
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'Email not found' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '15m' });

    const resetLink = `http://localhost:4201/reset-password/${token}`;

    // Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
      }
    });

    const mailOptions = {
    from: `"Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset Link',
      html: `
        <h3>Reset Your Password</h3>
        <p>Click below to reset your password. Link valid for 15 minutes:</p>
        <a href="${resetLink}" target="_blank"
          style="background:#007bff;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">
          Reset Password
        </a>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset link sent to your email!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset link', error });
  }
};

// ✅ RESET PASSWORD (update in DB)
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = password;
    await user.save();

    res.json({ message: 'Password reset successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword
};
