const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const sequelize = require('./connection/database');
const loginController = require('./controller/loginController')
const expensesController = require('./controller/expenses')
var cors = require('cors')

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',loginController.getSingUpForm);
app.post('/singup',loginController.postSingUpUser);
app.get('/singin', loginController.getSingInForm);
app.post('/singin', loginController.postSingInUser);
app.get('/getexpense',expensesController.getExpenses);
app.post('/postexpense',expensesController.postExpenses);
app.get('/getdata', expensesController.getData);
app.post('/delete-expense',expensesController.deleteExpenses)

app.listen( 3000, () => { console.log('Server running on port 3000');

sequelize
.sync()
// .sync({force: true})
    .then(() => { console.log('Database synced') })
    .catch((err) => { console.log(err) });
});