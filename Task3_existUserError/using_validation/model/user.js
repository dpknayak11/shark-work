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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.DOUBLE
    }
});
module.exports = User; 