import express from 'express';

//Import controller function
import { contactUs } from '../controllers/contactUsController.js';

// Instantiate router method in express
const router = express.Router();

// Route to controller
router.post('/', contactUs);

export default router;
