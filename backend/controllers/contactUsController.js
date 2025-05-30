import validator from 'validator'; // To validate 
import { ContactUs } from '../models/contactUsModel.js';

//* Code Logic for contact us form
export const contactUs = async (req, res, next) => {
    try {
        // Deconstruct necessary fields from req.body
    const {name, email, message} = req.body;
    // Validate input
    if (!name || !email || !message){
        return res.status(400).json({error: "Please fill in all required fields."});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({error: "Please input a valid Email address."});
    }
    // Create new contact us form based off ContactUs Model
    const newContactUs = new ContactUs({
        name, email, message
    });
    // Save newly created form to DB
    await newContactUs.save();

    //Response message upon successful contact
    return res.status(201).json({message: "Thank you for reaching out! Your message has been received and we will get back to you soon."});
    } catch (error) {
        console.error('Error', error);
        next(error);
    }
}