// require packages
const express = require('express'); // require express package 
const path = require('path'); // require path package 
const bodyParser = require('body-parser'); // require body-parser package 
const fs = require('fs'); // require fs package 
const userLogin = require('./router/userLogin') // require userLogin module 
const userMessage = require('./router/userMessage') // require userMessage module 

// initialize express
const app = express();

// parse url-encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // parse url-encoded bodies 

// use login route
app.use(userLogin); // use userLogin route 

// GET messages route
app.use(userMessage); // use userMessage route 

// 404 not found route
app.use((req, res, next) => { // set up custom 404 not found route 
    res.status(404).sendFile(path.join(__dirname, 'htmlFile', 'error.html')); // send file when 404(not found) occurs
});

// listen for incoming requests
app.listen(3000); // listen for incoming requests on port 3000