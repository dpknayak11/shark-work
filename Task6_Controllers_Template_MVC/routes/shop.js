// import path and express modules 
const path = require('path');
const express = require('express');

// import products controller 
const productsController = require('../controllers/products')

// create router object
const router = express.Router();

// set up route to get list of products
router.get('/', productsController.getProducts);

// export router
module.exports = router;