import nodemailer from 'nodemailer';

//Functioin to send email
export const sendBookingEmail = async (bookingInfo) => {
    //Set up transporter
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        //Set up mail options
        const mailOptions = {
            from: `"Mantra Attorney LP Website" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "New Consultation Booking",
             html: `
                <h2>New Booking Received</h2>
                <p><strong>Name:</strong> ${bookingInfo.name}</p>
                <p><strong>Email:</strong> ${bookingInfo.email}</p>
                <p><strong>Mobile:</strong> ${bookingInfo.mobileNo}</p>
                <p><strong>Legal Service Needed:</strong> ${bookingInfo.legalServiceNeeded}</p>
                <p><strong>Message:</strong> ${bookingInfo.message || 'N/A'}</p>
                <p><strong>Files Uploaded:</strong> ${bookingInfo.uploadedFile?.length || 0}</p> 
            `
        };

        //Send the email
        transporter.sendMail(mailOptions);
        console.log("Booking email sent to Admin.");
    } catch (error) {
        console.error(`
            Failed to send email to admin.
            Error: ${error}
        `)
    };
};