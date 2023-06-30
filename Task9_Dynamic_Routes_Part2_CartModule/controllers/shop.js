const Product = require('../models/product')
const Cart = require('../models/cart');

// GET product page route
exports.getProducts = (req, res, next) => {
    console.log("Shop-Product GET........"); // Log that GET is working
    console.log(Product);
    // const products = Product.fetchAll();
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,          // Products array
            pageTitle: 'All Shop Product List',        // Shop page title
            path: '/product-list',                // URI in navigation
        });
    });
};

exports.getShopIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,          // Products array
            pageTitle: 'My Shop',        // Shop page title
            path: '/',                // URI in navigation
        });
    });
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

    Product.findProductById(productId, (product)=>{
    console.log('product is : ', product);
    res.render('shop/product-details', {
        pageTitle: 'My Product Details',
        path: '/product-details',
        product: product
    })
    })
};
