const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Print Error 404
app.use((req, res, next) =>{
    res.status(404).send('<h1>Page is Not Found! Errro: 404');
});

//listen to the port
app.listen(3000);