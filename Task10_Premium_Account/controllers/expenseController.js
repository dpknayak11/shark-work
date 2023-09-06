const path = require('path')
// const jwt = require('jsonwebtoken');
const Expense = require('../models/expenseModel')
const authenticate = require('../middleware/auth')

const getExpense = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'views', 'expense-page.html'));
}
const getExpenseData = async (req, res, next) => {
    const id = req.user.id;
    try{
       const details = await Expense.findAll({where: {userId: id}})
            res.json(details)
            console.log(details);
       
    }catch(err){console.log(err)}
}
const postExpense = async (req, res, next) => {
    const { amount, description, category } = req.body;
    try {
        console.log('post expense vali ',req.user.id)
        const expense = await Expense.create({ amount: amount, description: description, category: category, userId: req.user.id, authenticate });
        return res.status(201).json({ expense });
    } catch (err) { console.log(err) }
}
const deleteExpense = async (req, res, next) => {
    const expenseId = req.body.obj_id;
    try {
        console.log('Delete expenseId: ', expenseId);
        Expense.destroy({ where: { id: expenseId } });
        console.log("Expense deleted successfully");
    } catch (err) { console.log(err) }
}

module.exports = {
    getExpenseData, getExpense, postExpense, deleteExpense
} 