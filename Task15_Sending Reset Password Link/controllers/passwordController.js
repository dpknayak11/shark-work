require('dotenv').config()
// ...........................
const path = require("path");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require('../models/userModel');
const ForgotpasswordRequest = require('../models/resetPasswordModel')
const uuid = require("uuid");

// const saltRounds = 10;
// const hashPassword = async (password) => {
//     return await bcrypt.hash(password, saltRounds);
// };

exports.getPasswordForgot = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'password-forgot-page.html'))
}

exports.sendEmail = async (req, res, next) => {
    const email = req.body.email;
    console.log("email", email)
    try {
        const user = await User.findOne({ where: { email: email } });
        const requestId = uuid.v4();
        if (user) {
            let obj = await ForgotpasswordRequest.create({ id: requestId, isactive: true, userId: user.id });
            // console.log("reset password module:.",obj);
        }
        else { return res.status(500).json({ message: "No account registered with this mail id", sucess: false }) }

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
            text: "hi welcome",
            html: `<h3>Hi! We got the request from you for reset the password. Here is the link below >>></h3>
                   <a href="http://localhost:3000/resetPassword/${requestId}"> Click Here</a>`,
        }
        transporter.sendMail(mailoptions, function (error) {
            if (error) { res.status(500).json({ message: "can not send email", success: false }); }
            else { 
                return res.status(200).send(`<script>alert('email sent successfully check your Gmail'); window.location.href='/'</script>`);

                res.status(200).json({ message: "email sent successfully", success: true })
             }
        });
    }
    catch (err) {
        console.log(err);
        return res.status(409).json({ message: "failed changing password" });
    }
}

exports.getResetPassword = (req, res, next) => {
    const userid = req.params.requestId;
    try {
        console.log("getResetPassword:...", userid);
        res.status(200).sendFile(path.join(__dirname, '..', 'views', 'resetPassword-page.html'));
    } catch (error) { console.log(error); }
}


exports.updatePassword = async (req, res, next) => {
    try {
        const Password = req.body.newPassword;
        const resetpasswordId = req.params.requestId;
        console.log("newPassword:....", Password, ".newPassword ", resetpasswordId);
        const user = await ForgotpasswordRequest.findOne({ where: { id: resetpasswordId } })
        const newUserPaword = await User.findOne({ where: { id: user.userId } })
        // console.log('user:', user );
        // console.log('newUserPaword:', newUserPaword );
        if (newUserPaword) {
            const result = await ForgotpasswordRequest.update(
                { isactive: false },
                { where: { id: resetpasswordId } }
            );

            bcrypt.hash(Password, 10, async (err, newPassword) => {
                if (err) { return res.status(500).json({ message: "something went wrong" }) }
                const user = await User.update(
                    { password: newPassword },
                    { where: { id: newUserPaword.id } }
                );
                console.log("user password data: ", user);
                return res.status(200).send(`<script>alert('Password changed successfully'); window.location.href='/'</script>`);
                // return res.status(201).json({newPassword, message:"password changed successfully" })
            });
        }
        else {
            console.log(error);
            res.status(501).json({ message: "something is wrong" });
        }

    } catch (err) { console.log(err) }
}
