// Require the http, express, path, bodyParser and sequelize modules
const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');

// Require the models for Product, User, Cart, CartItem, Order and OrderItem
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// Create an express app
const app = express();

// Set the view engine to ejs and the views folder to views
app.set('view engine', 'ejs');
app.set('views', 'views');

// Require the routes for admin, shop, contactus and showContactus
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactusData = require('./routes/contactus');
const showContactusData = require('./routes/showContactus');

// Require the error controller for handling 404 errors
const errorcontroller = require('./controllers/404')

// Use bodyParser to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));

// Use express.static to serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Use a middleware to find the user by id and store it in the request object
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
});

// Use the admin routes with the /admin prefix
app.use('/admin', adminRoutes);

// Use the shop routes without any prefix
app.use(shopRoutes);

// Use the contactusData route without any prefix
app.use(contactusData);

// Use the showContactusData route without any prefix
app.use(showContactusData);

// Use the error controller to handle 404 errors
app.use(errorcontroller.get404);

// Define the associations between the models using belongsTo, hasMany, hasOne and belongsToMany methods

// Define a one-to-many relationship between Product and User, with a cascade delete option
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

// Define a one-to-many relationship between User and Product
User.hasMany(Product);

// Define a one-to-one relationship between User and Cart
User.hasOne(Cart)

// Define a one-to-one relationship between Cart and User
Cart.belongsTo(User)

// Define a many-to-many relationship between Cart and Product, using CartItem as the join table
Cart.belongsToMany(Product, { through: CartItem })

// Define a many-to-many relationship between Product and Cart, using CartItem as the join table
Product.belongsToMany(Cart, { through: CartItem })

// Define a one-to-many relationship between Order and User
Order.belongsTo(User);

// Define a one-to-many relationship between User and Order
User.hasMany(Order);

// Define a many-to-many relationship between Order and Product, using OrderItem as the join table
Order.belongsToMany(Product, { through: OrderItem });

// Sync the models with the database using sequelize.sync method
sequelize.sync()
  .then(result => { return User.findByPk(1) }) // Find or create a user with id 1
  .then(user => {
    if (!user) { return User.create({ name: 'Max', email: 'test@test.com' }) } // Create a user if not found
    return user;
  })
  .then(user => { return user.createCart() }) // Create a cart for the user
  .then(cart => { app.listen(3000) }) // Start listening on port 3000
  .catch(err => { console.log(err) }); // Handle any errors
