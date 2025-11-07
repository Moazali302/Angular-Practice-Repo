const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

// ================= Middleware =================

// ✅ CORS configuration for Angular frontend
app.use(cors({
  origin: 'http://localhost:4201',   // Angular app port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  next()
})

// ================= Body parsers =================
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ================= Routes =================
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

// ================= Database =================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/angulardb'

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully...'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

// ================= Root Route =================
app.get('/', (req, res) => {
  res.send('🚀 Server is running successfully...')
})

// ================= Server =================
const PORT = 3000
app.listen(PORT, () => console.log(`✅ Server running at: http://localhost:${PORT}`))
