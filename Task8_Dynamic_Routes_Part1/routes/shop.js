// import path and express modules 
const path = require('path');
const express = require('express');

// import products controller 
const shopController = require('../controllers/shop')

// create router object
const router = express.Router();

// set up route to get list of products
router.get('/', shopController.getShopIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId',shopController.getProductsDetails);
router.get('/cart',shopController.getMyCart);
router.get('/checkout',shopController.getMyCheckout);
router.get('/orders',shopController.getMyOrder);


// export router
module.exports = router;