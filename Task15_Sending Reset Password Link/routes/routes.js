const express = require('express');
const router = express.Router();

const user = require('../controllers/userController');
const expense = require('../controllers/expenseController');
const purchase = require('../controllers/purchaseController')
const leaderboardController = require('../controllers/leaderboardController')
const passwordController = require('../controllers/passwordController')
const authenticate = require('../middleware/auth.js')

router.get('/', user.getUserLogIn);
router.post('/user-login',user.postUserLogIn);
router.post('/user-signup',user.postUserSingUp);

router.get('/get-expense',expense.getExpense);
router.get('/get-expense-data',authenticate,expense.getExpenseData);
router.post('/post-expense',authenticate,expense.postExpense);

router.post('/delete-expense',authenticate,expense.deleteExpense);

router.get('/purchaseMemberShip', authenticate, purchase.purchaseMemberShip);

router.post('/updatetransactionstatus',authenticate,purchase.updateTransactionStatus);

router.get('/leaderboard',leaderboardController.getLeaderboardPage);
// router.get('/editExpense/:id',authenticate,expense.editExpense);

router.get('/passwordForgotPage',passwordController.getPasswordForgot);
router.post('/sendEmail',passwordController.sendEmail);
router.get('/resetPassword/:requestId',passwordController.getResetPassword);
router.post('/resetPassword/:requestId',passwordController.updatePassword);


module.exports = router;