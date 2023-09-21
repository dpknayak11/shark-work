require('dotenv').config()
const express = require('express');
const path = require('path')
const Sib = require('sib-api-v3-sdk');


const bodyParser = require('body-parser');
var cors = require('cors')
const routes = require('./routes/routes');
const sequelize = require('./connections/database');
const Expense = require('./models/expenseModel');
const User = require('./models/userModel')
const Order = require('./models/ordersModel')
const premiumUser =require('./routes/premiumFeature')

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(premiumUser)
app.use(routes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

// const port = process.env.PORT;
app.listen(3000, () => { console.log(`Server running on port `);
sequelize
.sync()
// .sync({force: true})
.then(() => { console.log('Database synced') })
.catch((err) => { console.log(err) });
});
