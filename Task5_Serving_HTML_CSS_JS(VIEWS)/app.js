const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const viewPath = require('./utils/path');
const contactus = require('./routes/contactus');
const success = require('./routes/success');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactus);
app.use(success);
// Print Error 404
app.use((req, res, next) =>{
    res.status(404).sendFile(viewPath('page-not-found.html'));
});

//listen to the port
app.listen(3000);