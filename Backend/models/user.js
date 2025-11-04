const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  email: { type: String, required: true, unique: true },
  password: { type: String, default: '' },   // social users ke liye empty
  country: { type: String, default: '' },    // optional for social login
  city: { type: String, default: '' },       // optional for social login
  provider: { type: String, default: 'local' }, // 'local', 'google', 'microsoft'
  registeredOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
