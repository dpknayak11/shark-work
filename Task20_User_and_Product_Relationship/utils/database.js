const Sequelize = require('sequelize').Sequelize;
// constructor(database: string, username: string, password: string, options: object)
// Instantiate sequelize with name of database, username and password.

const sequelize = new Sequelize('node-complete', 'root', 'root',{
    dialect:"mysql",
    host: 'localhost',
    // logging: false
})

module.exports = sequelize;