const path = require('path')
const Expense = require('../models/expenseModel')
const User = require('../models/userModel')
const sequelize = require('../connections/database')

const authenticate = require('../middleware/auth')
const getExpense = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'home-page.html'));
}
const getExpenseData = async (req, res, next) => {
    const id = req.user.id;
    try {
        const details = await Expense.findAll({ where: { userId: id } })
        res.json(details)
        console.log(details);

    } catch (err) { console.log(err) }
}
const postExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { amount, description, category } = req.body;
        console.log('post expense vali ', req.user.id)
        await User.update(
            { totalExpenses: req.user.totalExpenses + Number(amount) },
            { where: { id: req.user.id } },
            { transaction: t }
        );
        const expense = await Expense.create({ amount: amount, description: description, category: category, userId: req.user.id, authenticate }, { transaction: t });
        res.status(201).json({ expense });
        await t.commit();
    } catch {
        async (err) => {
            await t.rollback();
            console.log(err)
        }
    }
}
const deleteExpense = async (req, res, next) => {
    const expenseId = req.body.obj_id;
    try {
        console.log('Delete expenseId: ', expenseId);
        Expense.destroy({ where: { id: expenseId } });
        console.log("Expense deleted successfully");
    } catch (err) { console.log(err) }
}

module.exports = { getExpenseData, getExpense, postExpense, deleteExpense } 