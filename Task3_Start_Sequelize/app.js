// import packages
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
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
const errorcontroller = require('./controllers/404')

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
app.use(errorcontroller.get404);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
app.listen(4000);

  })
  .catch(err => console.log(err))

// create server and listen for requests