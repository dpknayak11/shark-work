const path = require('path');
const express = require('express');

const loginController = require('../controller/loign');
const router = express.Router();

router.get('/', loginController.getUser);
router.post('/', loginController.postUser);
router.get('/getsingin',loginController.getSingIn)

router.post('/postsingin',loginController.postSingIn)



module.exports = router;