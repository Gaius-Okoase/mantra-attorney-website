// Import express and multer to handle files
import express from 'express';
import multer from 'multer';

// Import modules from controllers
import { bookConsultation } from '../controllers/bookingController.js';

const router = express.Router(); // 
const storage = multer.memoryStorage(); // Store files in memory

// Specify file types allowed
const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]
//Instantiate multer
const upload = multer({
    storage : storage,
    limits: { fileSize: 50 * 1024 * 1024 }, //50 MB
    fileFilter: (req, file, cb) => {
        if(allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF or Word documents are allowed'), false);
        }
    }
});

router.post('/', upload.array('documents', 5), bookConsultation);

export default router;