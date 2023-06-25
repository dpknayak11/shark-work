// Define product ARRAY
const products = [];

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
    console.log(req.body); // Log body of request 
    console.log(req.body.title); // Log title from request body
    products.push({ title: req.body.title });  // Push product to array
    res.redirect('/');  // Redirect to shop page
};

// GET product page route
exports.getProducts = (req, res, next) => {
    console.log("Shop-Product GET........"); // Log that GET is working
    console.log(products); // Log products
    // Render shop page with products in array
    res.render('shop', {
        prods: products,          // Products array
        pageTitle: 'Shop',        // Shop page title
        path: '/',                // URI in navigation
        formCSS: true,            // CSS for a form set to true
        productForm: true,         // Product form true 
        activeAddProduct: true    // Track add-product page active in navigation
    });
};