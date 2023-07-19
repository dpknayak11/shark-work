
const express = require('express');
const path = require('path');


const router = express.Router();

const contactusGETcontroller = require('../controllers/contController');
const contactusPOSTcontroller = require('../controllers/contController');

router.get('/contactus', contactusGETcontroller.getAddContactus);
router.post('/contactus', contactusPOSTcontroller.postAddContactus);
module.exports = router;