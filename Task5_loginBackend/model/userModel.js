// Require the modules
const Sequelize = require('sequelize');
const sequelize = require('../connection/database');

// Define the user model
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

// Export the user model
module.exports = User;
