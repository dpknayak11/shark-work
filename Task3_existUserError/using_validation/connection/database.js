const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('expense_project', 'root', 'root', {
    dialect:'mysql', host: 'localhost'
})

module.exports = sequelize;