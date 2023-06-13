//import express 
const express = require('express');

//create router object
const router = express.Router();

//import path package 
const path = require('path');

//define all request of login page 
router.get('/login', (req, res, next) => {
    // return the login page
    res.sendFile(path.join(__dirname, '../', 'htmlFile', 'login.html'));
});

// export the router
module.exports = router;