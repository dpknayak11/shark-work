const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-Sellers_project', 'root', 'root',{
    host: 'localhost',dialect: 'mysql'
})
module.exports = sequelize;