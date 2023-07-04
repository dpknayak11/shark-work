// importing  express, path and router 
const express = require('express');
const path = require('path');
const router = express.Router();

// requiring contactuscontroller
const contactuscontroller = require('../controllers/contController');

//Creating a route (get) to showcontactus and a callback function of  contactuscontroller.getcontactus
router.get('/showContactus', contactuscontroller.getContactus)

//Exporting module
module.exports = router;