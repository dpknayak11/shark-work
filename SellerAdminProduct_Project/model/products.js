const Sequelize = require('sequelize');
const sequelize = require('../conection/database');

const Stock = sequelize.define('stock',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    price: { 
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    name: Sequelize.STRING,
})
module.exports = Stock;