const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');
const expense = require('../controllers/expenseController');
const purchase = require('../controllers/purchaseController');
const leaderboardController = require('../controllers/leaderboardController');
const reportController = require('../controllers/reportController');
const passwordController = require('../controllers/passwordController');
const authenticate = require('../middleware/auth.js');

router.get('/', user.getUserLogIn);
router.post('/user-login',user.postUserLogIn);
router.post('/user-signup',user.postUserSingUp);
// router.get("/isPremiumUser", authenticate, user.isPremiumUser);

router.get('/get-expense',expense.getHomePage);
// router.get('/get-expense-data',authenticate,expense.getExpenseData);
router.get("/getAllExpenses/:page",authenticate,expense.getAllExpensesforPagination);
router.post('/post-expense',authenticate,expense.postExpense);

router.post('/delete-expense',authenticate,expense.deleteExpense);

router.get('/purchaseMemberShip', authenticate, purchase.purchaseMemberShip);

router.post('/updatetransactionstatus',authenticate,purchase.updateTransactionStatus);

router.get('/leaderboard',leaderboardController.getLeaderboardPage);
router.get('/report',reportController.getReportPage);

router.post('/dailyreports',authenticate,reportController.dailyReports);
router.post('/monthlyReports',authenticate,reportController.monthlyReports)

// router.get('/editExpense/:id',authenticate,expense.editExpense);

router.get('/passwordForgotPage',passwordController.getPasswordForgot);
router.post('/sendEmail',passwordController.sendEmail);
router.get('/resetPassword/:requestId',passwordController.getResetPassword);
router.post('/resetPassword/:requestId',passwordController.updatePassword);

module.exports = router;