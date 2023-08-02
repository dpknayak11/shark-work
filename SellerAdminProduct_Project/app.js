// Require the http module to create a server
const http = require('http');
// Require the express module to handle routing and middleware
const express = require('express');
// Require the path module to work with file and directory paths
const path = require('path');
// Require the sequelize module to connect to a database and define models
const sequelize = require('./model/products')
// Require the body-parser module to parse incoming request bodies
const bodyParser = require("body-parser");
// Require the errorcontroller module to handle 404 errors
const errorcontroller = require('./controller/404')
// Require the adminpage module to handle routes related to admin page
const productPage = require('./routes/product')

// Create an express application
const app = express();

// Set the view engine to ejs and the views directory to views
app.set('view engine', 'ejs');
app.set('views', 'views');

// Use body-parser middleware to parse urlencoded request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Use express.static middleware to serve static files from public directory
app.use(express.static(path.join(__dirname,'public')))

// Use adminpage middleware to handle routes starting with /admin
app.use(productPage);
// Use errorcontroller middleware to handle any other routes that are not found
app.use(errorcontroller.get404);

// Sync the sequelize models with the database
sequelize.sync()
     .then(result => console.log('sequelize DataBase Connected!...'))
     .catch(err => console.log(err));
// Listen for incoming requests on port 2000
app.listen(2000);