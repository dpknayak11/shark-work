 // Define product ARRAY
 const Product = require('../models/product')

 // GET add-product route
 exports.getAddProduct = (req, res, next) => {
     console.log("Add-product GET.......... "); // Log that GET is working
     res.render('admin/add-product', {
         pageTitle: 'Add Product', // Provide page title
         path: '/add-product', // Provide URI in navigation
     });
 };
 
 exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,          // Products array
            pageTitle: 'All Admin Product List',        // Shop page title
            path: '/admin-products',                // URI in navigation
        });
    });
};
 
 // POST add-product route
 exports.postAddProduct = (req, res, next) => {
     console.log("Add-product POST......... ");  // Log post request
     const title = req.body.title;
     const description = req.body.description;
     const price = req.body.price;
     const imageUrl = req.body.imageUrl;

     const product = new Product(title,description,price,imageUrl);
     product.save();
     res.redirect('/');  // Redirect to shop page
 };

