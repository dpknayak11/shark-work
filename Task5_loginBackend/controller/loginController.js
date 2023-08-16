const path = require('path')
const User = require('../model/userModel');

// function valid(string) {
//     if (string == undefined || string.length === 0) { return true; }
//     else { return false; }
// }

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
                await User.create({ name, email, password });
                return res.status(201).json({ message: "Created new User!" });
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
                if (existUser.password == password) {
                    return res.status(200).json({ message: "User login successful" })
                } else { return res.status(401).json({ message: "User not authorized" })}
            } else { return res.status(404).json({ message: 'User not found' }) }
        }
    } catch (err) {
         console.log(err);
         res.status(500).json({ message: 'Internal Server Error' })
    }
}
