const path = require('path');
const express = require('express');
const router = express.Router();
const viewPath = require('../utils/path')


//GET -  /add-product
router.get('/add-product', (req, res, next) => {
    res.sendFile(viewPath('add-product.html'));
});
// adding middleware
//POST -  /add-product
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});
module.exports = router;