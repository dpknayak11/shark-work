const Product = require('../models/product')
const Cart = require('../models/cart');
const { fileLoader } = require('ejs');

// GET product page route
exports.getProducts = (req, res, next) => {
    console.log("Shop-Product GET........"); // Log that GET is working
    console.log(Product);

    Product.fetchAll()
    .then(([rows, fieldData])=>{
        res.render('shop/product-list', {
            prods: rows,          // Products array
            pageTitle: 'All Shop Product List',        // Shop page title
            path: '/product-list',                // URI in navigation
        });
    })
    .catch(err => console.log(err))
};

exports.getShopIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData])=>{
        res.render('shop/index', {
            prods: rows,          // Products array
            pageTitle: 'My Shop',        // Shop page title
            path: '/',                // URI in navigation
        });
    })
    .catch(err => console.log(err))
    
};

exports.getMyCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'My Cart',        // Shop page title
        path: '/cart',                // URI in navigation
    });
};

exports.postMyCart = (req, res, next) => {
    const prodId = req.body.productId;
    // console.log("prodId......", prodId);
    Product.findProductById(prodId, product => {
        Cart.addProduct(prodId, product.price)
    });
    res.redirect('/cart')
   
};
exports.getMyCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'My Checkout',        // Shop page title
        path: '/checkout',                // URI in navigation
    });
};

exports.getMyOrder = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'My Orders',        // Shop page title
        path: '/orders',                // URI in navigation
    });
};

exports.getProductsDetails = (req, res, next) => {
    const productId = req.params.productId;
    console.log('productId: ', productId);

    Product.findProductById(productId)
    .then(([product]) =>{
    console.log('product iss : ', product)
    res.render('shop/product-details', { 
        product: product[0],
        pageTitle: product.title,
        path: '/product'
    });
    })
    .catch(err => console.log(err));    
};
