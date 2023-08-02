// Import the Stock model from the model folder
const Stock = require('../model/products')

// Define a function to get the admin data from the database and render the seller admin page
exports.getProducts = async (req, res, next) =>{
    try{
        // Find all the products in the Stock table
        const products = await Stock.findAll()
        // Render the seller admin page with the products, page title, path and edit mode
        res.render('product-page',{
            pageTitle: 'Seller Admin Page',
            products: products,
            path: '/',
            isEdit:''
        })
    }catch(err){console.log(err)} // Catch and log any errors
}

// Define a function to add a new product to the database and redirect to the home page
exports.postProduct = async (req, res, next) =>{
    const bodyData = req.body // Get the request body data
    const { price, name} = bodyData; // Destructure the price and name from the body data
   try{
    // Create a new product in the Stock table with the price and name
    await Stock.create({price: price, name: name});
     res.redirect('/') // Redirect to the home page   
   }catch (err){console.log(err)} // Catch and log any errors
    
}

// Define a function to delete a product from the database and redirect to the home page
exports.deleteProduct = async (req, res, next) => {
    const productId = req.body.productId; // Get the product id from the request body
    try{ 
        // Find the product by its primary key in the Stock table
        const product = await Stock.findByPk(productId);
        // Delete the product from the table
        await product.destroy();
        // Redirect to the home page
        res.redirect('/')

    }catch(err){console.log(err)} // Catch and log any errors
}

// Define a function to get the edit mode and product id from the query parameters and render the edit page
exports.getEditProduct = async (req, res, next) =>{
   const isEditMode = req.query.isEditing; // Get the edit mode from the query parameters
   const productId = req.params.productId; // Get the product id from the route parameters
   try{
    // Find all the products in the Stock table that match the product id
    const productData = await Stock.findAll({ where: { id: productId}})
    // Get the first element of the product data array
    const product = productData[0];
    // Render the edit page with the product, page title, path and edit mode
    res.render('product-edit-page',{
        pageTitle: 'Editing Product',
        path: '',
        isEdit: isEditMode,
        products: product
    })
   }catch(err){console.log(err)} // Catch and log any errors
}

// Define a function to update a product in the database and redirect to the home page
exports.postEditProduct = async (req, res, next) =>{
    const bodyData = req.body;  // Get the request body data  
    const {productId, price, name} = bodyData; // Destructure the product id, price and name from the body data
    try{
        // Find the product by its primary key in the Stock table
        const product = await Stock.findByPk(productId);
        // Update the product price and name with the new values
        product.price = price;
        product.name = name;
        // Save the changes to the database
        const result = await product.save();
        // Redirect to the home page
        res.redirect('/')
    }catch(err){console.log(err)} // Catch and log any errors
}
