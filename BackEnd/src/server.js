import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config({
    path: './src/.env'
})

import authRoutes from './routes/authRoutes.js'
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const port = process.env.PORT || 3000
const app = express()

// MiddleWare
app.use(cors({origin: process.env.CLIENT_URL,credentials: true}))
app.use(express.json())
app.use(cookieParser())

// --- Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// --- Razorpay route
app.post('/api/payment/create-order', async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // in paise
    currency: 'INR',
    receipt: 'receipt_order_1',
  }

  try {
    const order = await razorpay.orders.create(options)
    res.json(order)
  } catch (err) {
    console.error('Razorpay error:', err)
    res.status(500).send('Error creating order')
  }
})

// Routes
app.use('/api/auth',authRoutes)
app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);

// Mongoose Connnectivity
const startServer = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`)

        app.listen(port, () =>{
            console.log(`🚀 Server is running at http://localhost:${port}`)
        })
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
}


startServer()