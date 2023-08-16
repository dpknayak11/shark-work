const path = require('path')
const User = require('../model/userModel');
const bcrypt = require("bcrypt");

exports.getSingUpForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'singup-page.html'));
}
exports.getSingInForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'singin-page.html'));
}

exports.postSingUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ where: { email: email } });
        if (existUser) { return res.status(404).json({ message: "This Email-Id User already exists!" }) }
        else {
            if (name == null || email == null || password == null) {
                return res.status(500).json({ message: "something went wrong"});
            }
            else {
            const saltRounds = 10;
            // const hashedPswd = await bcrypt.hash(password, saltRounds);
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                console.log(err);
                await User.create({ name, email, password: hash});
                return res.status(201).json({ message: "Created new User!" });
            })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.postSingInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email == null || password == null) { 
            return res.status(404).json({ message: "something went wrong" })
        } else {
            const existUser = await User.findOne({ where: { email: email } })
            if (existUser) {
                bcrypt.compare(password, existUser.password, (err, result) =>{
                    if (result == true) {
                        return res.status(200).json({ message: "User login successful" })
                    } else { return res.status(401).json({ message: "User not authorized" })}
                })
               
            } else { return res.status(404).json({ message: 'User not found' }) }
        }
    } catch (err) {
         console.log(err);
         res.status(500).json({ message: 'Internal Server Error' })
    }
}
