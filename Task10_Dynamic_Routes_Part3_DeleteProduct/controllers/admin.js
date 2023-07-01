// Define product ARRAY
const Product = require('../models/product')

// GET add-product route
exports.getAddProduct = (req, res, next) => {
    console.log("Add-product GET.......... "); // Log that GET is working
    res.render('admin/add-product', {
        pageTitle: 'Add Product', // Provide page title
        path: '/add-product', // Provide URI in navigation
        isEdit: '',
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

    const product = new Product( null, title, description, price, imageUrl);
    product.save();
    res.redirect('/');  // Redirect to shop page
};
exports.getEditMyProduct = (req, res, next) => {
    const isEditMode = req.query.isEditing;
    const productId = req.params.productId;
    console.log('isEditMode', isEditMode);
    Product.findProductById(productId, (product) => {
        res.render('admin/edit-product', {
            pageTitle: 'Editing Product',
            path: '',
            product: product,
            isEdit: isEditMode,
        })
    });
}

exports.saveModifedProduct = (req, res, next) => {
    const reqBody = req.body;
    const productId = reqBody.productId
    const modifiedTitletitle = reqBody.title;
    const modifiedTitledesc = reqBody.description;
    const modifiedTitleprice = reqBody.price;
    const modifiedTitleImgUrl = reqBody.imageUrl;

    const modifiedProduct = new Product(productId, modifiedTitletitle, modifiedTitledesc, modifiedTitleprice, modifiedTitleImgUrl)
    modifiedProduct.saveModifedProduct()
    res.redirect('/admin/admin-product')
}

// exports.removeProduct = (req, res, next) =>{
//     const productId = req.body.productId;
//     console.log('delete productId....',productId);
//     Product.remove(productId);
//     res.redirect('/admin/admin-product');
// }
exports.removeProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    console.log('delete productId....',prodId);
    Product.remove(prodId);
    res.redirect('/admin/admin-product');
}