const path = require('path');
const express = require('express');
const router = express.Router();
const viewPath = require('../utils/path')


// Path and method chacking....
router.get('/', (req, res, next) => {
    // Allows the request to continue to the next middleware in line
    res.sendFile(viewPath('shop.html'));
});

module.exports = router;