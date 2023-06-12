const express = require('express');
const router = express.Router();

// Path and method chacking....
router.get('/', (req, res, next) => {
    // Allows the request to continue to the next middleware in line
    res.send('<h1>Hello from Express!</h1>');
});

module.exports = router;