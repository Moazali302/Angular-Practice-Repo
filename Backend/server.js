const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/angulardb')
.then(() => {
  console.log('MongoDB connected...')
})
.catch(err => {
  console.log('MongoDB connection error:', err)
})

// Default Route
app.get('/', (req, res) => {
  res.send('Server is running...')
})

// Start Server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
