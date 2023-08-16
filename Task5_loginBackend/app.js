const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const sequelize = require('./connection/database');
const loginController = require('./controller/loginController')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',loginController.getSingUpForm);
app.post('/singup',loginController.postSingUpUser);
app.get('/singin', loginController.getSingInForm);
app.post('/singin', loginController.postSingInUser);
// app.get('/users', loginController.getUser);

app.listen(3000, () => { console.log('Server running on port 3000');

sequelize
.sync()
    .then(() => { console.log('Database synced') })
    .catch((err) => { console.log(err) });
});