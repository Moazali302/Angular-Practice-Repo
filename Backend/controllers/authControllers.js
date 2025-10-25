const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');

const SECRET_KEY = 'mysecretkey';

// ======================== SIGNUP =========================
const signupUser = (req, res) => {
  const { name, email, password, country, city } = req.body;

  if (!name || !email || !password || !country || !city) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists!' });
      }

      const newUser = new User({
        name,
        email,
        password,
        country,
        city,
      });

      newUser
        .save()
        .then(() => {
          res.json({ message: 'Signup successful!' });
        })
        .catch((err) => {
          res.status(500).json({ message: 'Error saving user', error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Signup failed!', error: err });
    });
};

// ======================== LOGIN =========================
const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, password })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials!' });
      }

      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: 'Login successful!', token });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Login failed!', error: err });
    });
};

// ======================== PROFILE =========================
const getProfile = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token!' });

    User.findById(decoded.id)
      .select('-password')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found!' });
        }
        res.json({ user });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error fetching profile', error: err });
      });
  });
};

// ======================== UPDATE PROFILE =========================
const updateProfile = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const { name, email, country, city } = req.body;

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token!' });

    User.findByIdAndUpdate(
      decoded.id,
      { name, email, country, city },
      { new: true }
    )
      .select('-password')
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found!' });
        }
        res.json({
          message: 'Profile updated successfully!',
          user: updatedUser,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Profile update failed!', error: err });
      });
  });
};

// ======================== FORGOT PASSWORD =========================
const forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Email not found!' });
      }

      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '15m' });
      const resetLink = `http://localhost:4201/reset-password/${token}`;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Reset Password',
        html: `
          <h3>Reset Your Password</h3>
          <p>Click below to reset your password (valid for 15 minutes):</p>
          <a href="${resetLink}" target="_blank">Reset Password</a>
        `,
      };

      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.json({ message: 'Reset link sent to your email!' });
        })
        .catch((err) => {
          res.status(500).json({ message: 'Email sending failed', error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong', error: err });
    });
};

// ======================== RESET PASSWORD =========================
const resetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(400).json({ message: 'Invalid or expired token!' });

    User.findById(decoded.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found!' });
        }

        user.password = password;
        user
          .save()
          .then(() => {
            res.json({ message: 'Password reset successful!' });
          })
          .catch((err) => {
            res.status(500).json({ message: 'Error saving new password', error: err });
          });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Reset failed', error: err });
      });
  });
};

module.exports = {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
};
