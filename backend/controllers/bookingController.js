// Import validoator package to check email
import validator from 'validator';

// Code Logic to Book Consultation
export const bookConsultation = async (req, res) => {
    try {
        //Deconstruct required input from req.body
        const {
        name, 
        email, 
        mobileNo, 
        legalServiceNeeded, 
        preferredDateAndTime, 
        comment
    } = req.body

    //Confirm availability of inputs
    if(!name 
        || !email 
        || !mobileNo 
        || !legalServiceNeeded 
        || !preferredDateAndTime 
    ) {
        return res.status(400).json({error: "Please fill all required fields."})
    };

    //Validate Email Address
    if(!validator.isEmail(email)) {
        return res.status(400).json({ error: "Please insert a valid Email address."})
    };

    // Handle document attachment
    const docs = req.files;
    if (docs) {
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
    } else {
        return res.send("No document attached.")
    }
    } catch (error) {
        console.error("Error booking consultation:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
    }
}