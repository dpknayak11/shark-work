const express = require('express');
const router = express.Router();

const user = require('../controllers/userController');
const expense = require('../controllers/expenseController');
const authenticate = require('../middleware/auth.js')


router.get('/', user.getUserLogIn);
router.post('/user-login',user.postUserLogIn);

router.get('/user-signup',user.getUserSignUp);
router.post('/user-signup',user.postUserSingUp);

router.get('/get-expense',expense.getExpense);
router.get('/get-expense-data',authenticate,expense.getExpenseData);
router.post('/post-expense',authenticate,expense.postExpense);

router.post('/delete-expense',authenticate,expense.deleteExpense);

module.exports = router;