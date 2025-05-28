// Install necessary packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import bookingRouter from './routers/bookingRouter.js'
import authRouter from './routers/authRouter.js'
import connectDb from './config/db.js';
import { verifyAdmin } from './middleware/verifyAdmin.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config(); // To access .env
connectDb(); //Connect server to MongoDB

const app = express(); // Instantiate express app
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

//const PORT = 3500; // Set up port to listen to server

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: "*"}));
app.use((req, res, next) => {
  console.log(`Received request with ${req.method} for ${req.url} 
    Origin: ${req.headers.origin}
    Header: ${req.headers}
    Body: ${req.body}`);
  next();
});

//* Code Logic to serve static public folder

//Serve static public files
app.use(express.static('public'));
// // Route to login page
// app.get('/adminLogin.html', (req, res) => {
//  res.sendFile(path.join(__dirname, 'public', 'adminLogin.html'));
// });
// // Protected route for dashboard page
// app.get('/dashboard.html', verifyAdmin, (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
// });


const PORT = process.env.PORT || 3500; // Set up port to listen to server

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