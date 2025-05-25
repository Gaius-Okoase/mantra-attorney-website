// Import validoator package to check email
import validator from 'validator';
//Import Models 
import { Booking } from '../models/bookingModel.js';
import { uploadFileToS3 } from '../utils/s3Uploader.js';
import { sendBookingEmail } from '../utils/emailSender.js';

// Code Logic to Book Consultation
export const bookConsultation = async (req, res, next) => {
    try {
        // Ensure req.body exists before destructuring
        if (!req.body) {
            return res.status(400).json({ error: "No form data received. Please submit all required fields." });
        }
        //Destructure required input from req.body
        const {
        name, 
        email, 
        mobileNo, 
        legalServiceNeeded, 
        preferredDateAndTime, 
        comment
    } = req.body

    //Confirm availability of inputs
    if(!name || !email || !mobileNo || !legalServiceNeeded || !preferredDateAndTime ) {
        return res.status(400).json({error: "Please fill all required fields."})
    };

    //Validate Email Address
    if(!validator.isEmail(email)) {
        return res.status(400).json({ error: "Please insert a valid Email address."})
    };

    // Handle document attachment
    //? Commenting out mandatory file upload requirements
    /* const file = req.files;
     if (!file) {
         return res.status(400).json({message: "No document attached."})
     } */

    //? Commenting out logic for file meta data with only multer
    /* const uploadedFile = file.map((file) => ({
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        fileBuffer: file.buffer
    })); 

    uploadedFile.forEach((doc, index) => {
        console.log(`File ${index + 1}:`);
        console.log(`- Name: ${doc.fileName}`);
        console.log(`- Type: ${doc.fileType}`);
        console.log(`- Size: ${doc.fileSize} bytes`);
    });*/

    //Handling files with AWS S3
    const uploadedFiles = [];

    for (const file of req.files || []) {
        const result = await uploadFileToS3(file); 
        uploadedFiles.push({
            fileName: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size,
            s3Url: result.url,
            s3Key: result.key,
        });
        // Log file details to console
        //console.log(`Uploaded file: ${file.originalname}, type: ${file.mimetype}, size: ${file.size}`);
    }   

    // Create and save new booking to DB
    const newBooking = new Booking({
        name,
        email,
        mobileNo,
        legalServiceNeeded,
        preferredDateAndTime,
        comment,
        uploadedFile: uploadedFiles
    });

    console.log('Booking instance:', newBooking);


    await newBooking.save();

    //Send booking notification to admin
    await sendBookingEmail(newBooking);

    //Response for successfull booking
    return res.status(201).json({message: "Consultation booked successfully."});
    } catch (error) {
        console.log("Error booking consultation:", error);
        next(error);
    };
}

// Code Logic to get all bookings
export const getAllBooking = async (req, res, next) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }); // get all bookings
        res.status(200).json({
            totalBooking: bookings.length,
            bookings: bookings
        });
    } catch (error) {
        console.error(`Error retrieving bookings`);
        next(error);
    }
};