// Install necessary packages
import express from 'express';
import cors from 'cors';
import bookingRouter from './routers/bookingRouter.js'
const app = express(); // Instantiate express app

const PORT = 3500; // Set up port to listen to server

// Middlewares to parse json data
app.use(express.json());
app.use(cors())

app.use('/api/v1/booking', bookingRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})