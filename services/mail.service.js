const nodemailer = require('nodemailer');


const sendMail = async (to, message)=>{
    if(!to || !message) throw new Error("mail and message are required!");
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Using Gmail service
            auth: {
                user: process.env.EMAIL,
                pass: process.env.mailAppPassword, 
            },
        });

        const mailOptions = {
            to,
            subject: 'Alert!!! Emergency!!!', 
            html: message,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

module.exports = sendMail;