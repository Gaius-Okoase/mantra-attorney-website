import express from 'express';

//Import necessary modules
import { adminLogin } from '../controllers/authController.js';

//Istantiate the router method in express
const router = express.Router();

//Route to controller
router.post('/', adminLogin);

export default router;