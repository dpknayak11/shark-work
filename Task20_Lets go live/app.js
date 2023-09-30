require('dotenv').config()
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
var cors = require('cors');
const fs = require("fs");
const compression=require('compression');
// const helmet = require('helmet')

const userRoutes = require('./routes/userRoute')
const expenseRoutes = require('./routes/expenseRoutes')
const premiumRoutes = require('./routes/premuimeRoutes')
const resetPasswordRoutes = require('./routes/resetPasswordRoutes')

const sequelize = require('./connections/database');
const Expense = require('./models/expenseModel');
const User = require('./models/userModel')
const Order = require('./models/ordersModel')
const ResetPassword = require('./models/resetPasswordModel')

const app = express();
app.use(cors())
// app.use(helmet())

app.use(compression())// it is use to decrease the file size we sending to the client

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
);

const morgan = require("morgan");
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", userRoutes);
app.use(expenseRoutes);
app.use(premiumRoutes);
app.use(resetPasswordRoutes)
// app.use(routes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

ResetPassword.belongsTo(User);
User.hasMany(ResetPassword);

// const port = process.env.PORT;
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port `);
    sequelize
        .sync()
        // .sync({force: true})
        .then(() => { console.log('Database synced') })
        .catch((err) => { console.log(err) });
});
