const showLeaderBoard=require('../controllers/premium')
const express = require("express");
const router = express.Router();

const premium=require('../controllers/premium.js');
const userauthenticate = require('../middleware/auth.js');

router.get('/usersLeaderBoard',userauthenticate,premium.showLeaderBoard);

module.exports = router;