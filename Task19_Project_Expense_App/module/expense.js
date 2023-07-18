const Sequelize = require('sequelize');
const sequelize = require('../conections/database');

// Define the User model
const Expense = sequelize.define('expense',{
    // Make the id property the primary key, auto-incrementing and not nullable
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
   
    // Make the number property a double type and not nullable
    amount: { 
        type: Sequelize.DOUBLE,
        allowNull: false
    },
     // Make the name property a string type
     description: Sequelize.STRING,
    // Make the email property a string type and not nullable
    Category: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
// Export the User model for other modules to use
module.exports = Expense;
