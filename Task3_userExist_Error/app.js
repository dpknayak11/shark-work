const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./connection/database');
const loginPage = require('./routes/login')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(loginPage)
app.use((req, res, next) =>{
    res.status(404).send('Erorr: 404')
})

sequelize.sync()
.then(result =>{ console.log("Database is connected");
}).catch(err => console.log(err))

app.listen(5000);
