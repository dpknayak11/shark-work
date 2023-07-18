// Import the Sequelize module
const Sequelize = require('sequelize').Sequelize;

// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize('node-expense', 'root', 'root',{
    host: "localhost",
    dialect: 'mysql'
})

// Export the sequelize instance for other modules to use
module.exports = sequelize;