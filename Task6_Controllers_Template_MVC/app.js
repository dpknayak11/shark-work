// import packages
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// create Express app
const app = express();

// set view engine and view directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// import routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactusData=require('./routes/contactus');
const showContactusData= require('./routes/showContactus');

// set Body Parser to enable Express to read data from form
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder to serve global css and images
app.use(express.static(path.join(__dirname, 'public')));

// register routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactusData);
app.use(showContactusData);

// add generic error page
app.use((req, res, next) => {
    console.log("ERROR: 404 Page-not-found");
    res.status(404).render('404', { pageTitle: 'Page not Found', path: ""});
});

// create server and listen for requests
app.listen(5000);