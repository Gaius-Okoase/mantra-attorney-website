import mongoose from "mongoose";

// Define schema for Contact Us form
const ContactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Create ContacUs Model from ContactUsSchema
export const ContactUs = new mongoose.model('ContactUs', ContactUsSchema);