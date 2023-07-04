//Require the necessary modules
const path = require('path');
const express = require('express');

//Require the controllers responsible for managing products
const adminController = require('../controllers/admin');
// const productController = require('../controllers/shop');

//Create an express router
const router = express.Router();

//Set up route for getting the add product page
router.get('/add-product', adminController.getAddProduct);
router.get('/admin-product', adminController.getAdminProducts)

//Set up route for getting the post add product page 
router.post('/add-product', adminController.postAddProduct);
// get - /edit-product/id
router.get('/edit-product/:productId',adminController.getEditMyProduct);

router.post('/edit-product', adminController.saveModifedProduct);

router.post("/remove-product", adminController.removeProduct);

//Export the router so that it gets picked up by the app
module.exports =  router;