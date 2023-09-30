const Sequelize = require('sequelize');
const sequelize = require('../connections/database');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
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
        type: Sequelize.STRING,
        allownull: false,
      },
      isPremimum:Sequelize.BOOLEAN,
      totalExpenses: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }
})
module.exports = User;
