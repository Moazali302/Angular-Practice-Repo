const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ====== Connect Mongoose ======
mongoose.connect('mongodb://127.0.0.1:27017/angulardb')
  .then(() => console.log('✅ Mongoose Connected'))
  .catch(err => console.log('❌ Mongoose Error: ' + err));

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
