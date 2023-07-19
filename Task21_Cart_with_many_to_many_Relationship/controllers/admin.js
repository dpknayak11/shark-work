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
    req.user.getProducts()
    .then(products =>{
        res.render('admin/products', {
            prods: products,          // Products array
            pageTitle: 'All Admin Product List',        // Shop page title 
            path: '/admin-products',                // URI in navigation
        });
    })
    .catch(err => console.log(err))
};

// POST add-product route
exports.postAddProduct = (req, res, next) => {
    console.log("Add-product POST......... ");  // Log post request
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then(result=>{
         console.log('created product');
        res.redirect('/admin/admin-product');
        })
    .catch(err => console.log(err));
};

 
exports.getEditMyProduct = (req, res, next) => {
    const isEditMode = req.query.isEditing;
    const productId = req.params.productId;

    req.user.getProducts({ where: {id:productId}})
        
    .then(products => {
            const product = products[0]
            // if (!product){ return redirect('/')}
            res.render('admin/edit-product', {
                pageTitle: 'Editing Product',
                path: '',
                isEdit: isEditMode,
                product: product
            })
        })
        .catch(err => console.log(err))
}

exports.saveModifedProduct = (req, res, next) => {
    // const reqBody = req.body;
    const productId = req.body.productId
    const modifiedTitletitle = req.body.title;
    const modifiedTitledesc = req.body.description;
    const modifiedTitleprice = req.body.price;
    const modifiedTitleImgUrl = req.body.imageUrl;

    Product.findByPk(productId)
    .then(product => {
        product.title = modifiedTitletitle;
        product.description = modifiedTitledesc;
        product.price = modifiedTitleprice;
        product.imageUrl = modifiedTitleImgUrl;
        return  product.save();
    }).then( result => { 
        console.log(" updated data");
        res.redirect('/admin/admin-product')

    } )
    .catch(err => console.log(err))
}


exports.removeProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.findByPk(prodId)
    .then(product =>{
        return product.destroy();
    }).then(result => {
    res.redirect('/admin/admin-product');

    })
    .catch(err => console.log(err))
}