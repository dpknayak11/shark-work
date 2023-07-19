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
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.post('/create-order',shopController.postOrder);
router.get('/orders',shopController.getOrders);
router.get('/checkout',shopController.getCheckout);

// export router
module.exports = router;