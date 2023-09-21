require('dotenv').config()
const path = require("path");
const nodemailer = require("nodemailer");
const User = require('../models/userModel');
const uuid = require("uuid");

exports.getPasswordForgot = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'password-forgot-page.html'))
}

exports.sendEmail = async (req, res, next) => {
    const email = req.body.email;
    console.log("email", email)
    try {
        const transporter = await nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);
        const mailoptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset your Password",
            text: "hi welcome"
        }
        transporter.sendMail(mailoptions, function (error) {
            if (error) { res.status(500).json({ message: "can not send email", success: false }); }
            else { res.status(200).json({ message: "email sent successfully", success: true }) }
        });
    }
    catch (err) {
        console.log(err);
        return res.status(409).json({ message: "failed changing password" });
    }
}
