//Require the necessary modules
const path = require('path');
const express = require('express');

//Create an express router
const router = express.Router();

//Require the controllers responsible for managing products
const productController = require('../controllers/products');
const productsController = require('../controllers/products');

//Set up route for getting the add product page
router.get('/add-product', productController.getAddProduct);

//Set up route for getting the post add product page 
router.post('/add-product', productsController.postAddProduct);

//Export the router so that it gets picked up by the app
module.exports =  router;