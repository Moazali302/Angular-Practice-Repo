const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= Routes =================
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ================= Database =================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/angulardb';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully...'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// ================= Root Route =================
app.get('/', (req, res) => {
  res.send(' Server is running successfully...');
});

// ================= Server =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}`));
