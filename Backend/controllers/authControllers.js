const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

// ✅ SIGNUP
const signupUser = async (req, res) => {
  try {
    const { name, email, password, city } = req.body;

    if (!name || !email || !password || !city) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    const user = new User({ name, email, password, city });
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

// ✅ GET PROFILE
const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader);

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

// ✅ UPDATE PROFILE (proper place)
const updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const { name, email, city } = req.body;

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


module.exports = { signupUser, loginUser, getProfile, updateProfile };
