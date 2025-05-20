// Import validoator package to check email
import validator from 'validator';

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
    const docs = req.files;
    if (!docs) {
        return res.status(400).json({message: "No document attached."})
    }
    const uploadedDocs = docs.map((file) => ({
        documentName: file.originalname,
       documentType: file.mimetype,
        documentSize: file.size,
        documentBuffer: file.buffer
    }));

    uploadedDocs.forEach((doc, index) => {
        console.log(`Document ${index + 1}:`);
        console.log(`- Name: ${doc.documentName}`);
        console.log(`- Type: ${doc.documentType}`);
        console.log(`- Size: ${doc.documentSize} bytes`);
    });
    } catch (error) {
        console.log("Error booking consultation:", error);
        next(error);
    }
}