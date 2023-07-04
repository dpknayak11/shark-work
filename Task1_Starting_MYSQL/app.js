const express = require('express');
const sqldb = require('./connection/database')
const app = express();

function getProduct() {
    sqldb.execute('SELECT * FROM products')
    .then((result) => { console.log(result) })
    .catch((err)=> { console.log(err) })
}

getProduct();



app.use((req, res, next) => {
    res.write('<h1> hello</h1>')
});
app.listen(2000);