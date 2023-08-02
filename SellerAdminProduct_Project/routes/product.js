const express = require('express');
const productController = require('../controller/products')
const router = express.Router();

router.get('/',productController.getProducts);
router.post('/add-product', productController.postProduct);
router.get('/edit-product/:productId', productController.getEditProduct);
router.post('/update-product', productController.postEditProduct)
router.post('/delete-product',productController.deleteProduct)
module.exports = router;