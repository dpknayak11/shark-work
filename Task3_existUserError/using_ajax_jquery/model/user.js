const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../connection/database');
const User = sequelize.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});
module.exports = User; 