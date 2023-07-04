// The code imports the necessary libraries and controllers
const express = require('express');
const path = require('path');

// Create the express router 
const router = express.Router();

// Include the controllers 
const contactusGETcontroller = require('../controllers/contController');
const contactusPOSTcontroller = require('../controllers/contController');

// Add routes for GET and POST requests to '/contactus'
// GET will return a view with the contact form
router.get('/contactus', contactusGETcontroller.getAddContactus);
// POST will save the data to the database
router.post('/contactus', contactusPOSTcontroller.postAddContactus);

// Export the router
module.exports = router;