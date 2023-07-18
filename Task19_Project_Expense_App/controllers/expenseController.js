// Import the User model
const Expense = require('../module/expense')

// Define a controller function to render the form view with all users
exports.getAddExpense = (req, res, next) => {
    // Find all users from the database using Sequelize..
    Expense.findAll()
        .then(expense => {
            // Render the form view with the user data, page title, path and edit mode
            res.render('expense', {
                expenses: expense,
                pageTitle: 'All expense List',
                path: '/get-expense',
                isEdit: '',
            });
        })
        .catch(err => console.log(err)) // Handle any errors
};

// Define a controller function to handle the form submission and create a new user
exports.postAddExpense = (req, res, next) => {
    // Get the name, number and email from the request body
    const amount = req.body.amount;
    const description = req.body.description;
    const Category = req.body.Category;
    // Create a new user using Sequelize
    Expense.create({
        amount: amount,
        description: description,
        Category: Category,
    })
        .then(result => {
            console.log('Add New Expense');
            // Redirect to the get-users route
            res.redirect('/get-expense');
        })
        .catch(err => console.log(err)); // Handle any errors
};

// Define a controller function to render the edit-user view with the selected user data
exports.editExpense = (req, res, next) => {
    // Get the edit mode and user id from the query parameters
    const isEditMode = req.query.isEditing;
    const expenseId = req.params.expenseId;
    // Find the user by id using Sequelize
    Expense.findAll({ where: { id: expenseId } })
        .then(expenseData => {
            // Get the first element of the userdata array
            const expense = expenseData[0];
            // Render the edit-user view with the user data, page title, path and edit mode
            res.render('edit-expense', {
                pageTitle: 'Editing expense',
                path: '',
                isEdit: isEditMode,
                expenses: expense
            })
        })
        .catch(err => console.log(err)) // Handle any errors
}

// Define a controller function to handle the form submission and update an existing user
exports.updateExpense = (req, res, next) => {
    // Get the user id, name, number and email from the request body
    const expenseId = req.body.expenseId
    const modifiedAmount = req.body.amount;
    const modifiedDescription = req.body.description;
    const modifiedCategory = req.body.Category;

    // Find the user by id using Sequelize
    Expense.findByPk(expenseId)
        .then(expense => {
            // Update the user properties with the modified values
            expense.amount = modifiedAmount;
            expense.description = modifiedDescription;
            expense.email = modifiedCategory;
            // Save the updated user to the database using Sequelize
            return expense.save();
        }).then(result => {
            console.log(" updated data");
            // Redirect to the get-users route
            res.redirect('/get-expense')

        })
        .catch(err => console.log(err)) // Handle any errors
}

// Define a controller function to handle the delete button and delete an existing user
exports.deleteExpense = (req, res, next) => {
    // Get the user id from the request body
    const expenseId = req.body.expenseId;
    // Find the user by id using Sequelize
    Expense.findByPk(expenseId)
        .then(expense => {
            // Delete the user from the database using Sequelize
            return expense.destroy();
        }).then(result => {
            // Redirect to the get-users route
            res.redirect('/get-expense');

        })
        .catch(err => console.log(err)) // Handle any errors
}
