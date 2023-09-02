const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
var cors = require('cors')
const routes = require('./routes/routes');
const sequelize = require('./connections/database');
const Expense = require('./models/expenseModel');
const User = require('./models/userModel')
const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

User.hasMany(Expense);
Expense.belongsTo(User);

app.listen(4000, () => { console.log('Server running on port 4000');
sequelize
.sync()
// .sync({force: true})
.then(() => { console.log('Database synced') })
.catch((err) => { console.log(err) });
});
