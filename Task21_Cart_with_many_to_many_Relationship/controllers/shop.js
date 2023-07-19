const Product = require('../models/product')
const Cart = require('../models/cart');
// const Order = require('../models/order');
// const { fileLoader } = require('ejs');

// GET product page route
exports.getProducts = (req, res, next) => {
    console.log("Shop-Product GET........"); // Log that GET is working
    console.log(Product);
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,          // Products array
                pageTitle: 'All Shop Product List',        // Shop page title
                path: '/product-list',                // URI in navigation
            });
        })
        .catch(err => console.log(err))
};

exports.getShopIndex = (req, res, next) => {
    console.log(req.user);
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,          // Products array
                pageTitle: 'My Shop',        // Shop page title
                path: '/',                // URI in navigation
            });
        })
        .catch(err => console.log(err))
};
exports.getProductsDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId)
        .then(product => {
            res.render('shop/product-details', {
                product: product,
                pageTitle: product.title,
                path: '/product-details'
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        products: products,
                        pageTitle: 'My Cart',        // Shop page title
                        path: '/cart'               // URI in navigation
                    });
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } });
        }).then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        }).then(result => res.redirect('/cart'))
        .catch(err => console.log(err))
}


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'My Checkout',        // Shop page title
        path: '/checkout',                // URI in navigation
    });
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
      .getCart()
      .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
      })
      .then(products => {
        return req.user
          .createOrder()
          .then(order => {
            return order.addProducts(
              products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
              })
            );
          })
          .catch(err => console.log(err));
      })
      .then(result => {
        return fetchedCart.setProducts(null);
      })
      .then(result => {
        res.redirect('/orders');
      })
      .catch(err => console.log(err));
  };

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
