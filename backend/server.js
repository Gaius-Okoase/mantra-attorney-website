// Install necessary packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRouter from './routers/bookingRouter.js'
import authRouter from './routers/authRouter.js'
import connectDb from './config/db.js';

dotenv.config(); // To access .env
connectDb(); //Connect server to MongoDB

const app = express(); // Instantiate express app

//const PORT = 3500; // Set up port to listen to server

// Middlewares to parse json data
app.use(express.json());
app.use(cors())

const PORT = 3500; // Set up port to listen to server

// API Routes
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/auth', authRouter);
// Global Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({ error: "Sorry, something went wrong."})
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});