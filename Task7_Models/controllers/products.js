 // Define product ARRAY
const Product = require('../models/product')

// GET add-product route
exports.getAddProduct = (req, res, next) => {
    console.log("Add-product GET.......... "); // Log that GET is working
    // Render add-product page 
    res.render('add-product', {
        pageTitle: 'Add Product', // Provide page title
        path: '/add-product', // Provide URI in navigation
    });
};

// POST add-product route
exports.postAddProduct = (req, res, next) => {
    console.log("Add-product POST......... ");  // Log post request
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');  // Redirect to shop page
};

// GET product page route
exports.getProducts = (req, res, next) => {
    console.log("Shop-Product GET........"); // Log that GET is working
    console.log(Product);
    // const products = Product.fetchAll();
    Product.fetchAll((products)=>{
        res.render('shop', {
            prods: products,          // Products array
            pageTitle: 'Shop',        // Shop page title
            path: '/',                // URI in navigation
            formCSS: true,            // CSS for a form set to true
            productForm: true,         // Product form true 
            activeAddProduct: true    // Track add-product page active in navigation
        });
    });
};