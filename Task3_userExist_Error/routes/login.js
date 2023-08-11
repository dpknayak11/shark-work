const path = require('path');
const express = require('express');

const loginController = require('../controller/loign');
const router = express.Router();

router.get('/', loginController.getUser);
router.post('/', loginController.postUser);



module.exports = router;