const path = require('path')
const Expense = require('../models/expenseModel')
const User = require('../models/userModel')
const sequelize = require('../connections/database')
const authenticate = require('../middleware/auth')

const getHomePage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'home-page.html'));
}

const postExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { date, amount, description, category } = req.body;
        console.log('post expense vali ', req.user.id)
        await User.update(
            { totalExpenses: req.user.totalExpenses + Number(amount) },
            { where: { id: req.user.id } },
            { transaction: t }
        ).then(res => console.log(res)).catch(err => {
            return res.status(400).json(err);
        })
        const expense = await Expense.create({ date: date, amount: amount, description: description, category: category, userId: req.user.id, authenticate }, { transaction: t });
        res.status(201).json({ expense });
        await t.commit();
    } catch {
        async (err) => {
            await t.rollback();
            console.log(err)
        }
    }
}


const getAllExpensesforPagination = async (req, res, next) => {
    try {
        const pageNo = req.params.page;
        const limit = 6;
        const offset = (pageNo - 1) * limit;
        const totalExpenses = await Expense.count({ where: { userId: req.user.id } });
        const totalPages = Math.ceil(totalExpenses / limit);
        const expenses = await Expense.findAll({
            where: { userId: req.user.id },
            offset: offset,
            limit: limit,
        });
        res.json({ expenses: expenses, totalPages: totalPages });
    } catch (err) { console.log(err); }
};


const deleteExpense = async (req, res, next) => {
    const id = req.body.id;
    console.log('Delete expenseId :', id);
    try {
        const expense = await Expense.findByPk(id);
        await User.update({ totalExpenses: req.user.totalExpenses - expense.amount },
            { where: { id: req.user.id } });
        await Expense.destroy({ where: { id: id, userId: req.user.id } });
        res.redirect("/get-expense");
    } catch (err) { console.log(err) }
}

const editExpense = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = req.body.category;
        const description = req.body.description;
        const amount = req.body.amount;
        const expense = await Expense.findByPk(id);

        await User.update({ totalExpenses: req.user.totalExpenses - expense.amount + Number(amount) },
            { where: { id: req.user.id } });
        await Expense.update({
            category: category,
            description: description,
            amount: amount
        },
            { where: { id: id, userId: req.user.id } }
        );
        res.redirect("/get-expense");
    } catch (err) { console.log(err); }
}

module.exports = { getHomePage, postExpense, deleteExpense, editExpense, getAllExpensesforPagination } 