const path = require('path');
const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'loginPage.html'));
});
module.exports = router;