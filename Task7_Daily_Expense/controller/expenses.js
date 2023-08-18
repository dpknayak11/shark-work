const path = require('path')
const Expense = require('../model/expenseModel')
exports.getExpenses = (req,res,next) =>{
        res.sendFile(path.join(__dirname, '../', 'views', 'expenses-page.html'))
}
exports.postExpenses = async (req,res,next) =>{
    try{
    const {amount, description, category} = req.body;
    const data =await Expense.create({amount:amount, description:description, category:category});
    return res.status(201).json({expenseData:data});
    }catch(err){console.log(err)}
}

exports.getData = (req,res,next)=>{
    Expense.findAll().then((data) =>{
        res.status(201).json(data)
    }).catch(err =>{console.log(err)})
}
exports.deleteExpenses = (req,res,next) =>{
    const expenseId =req.body.obj_id;
    console.log(expenseId);
    Expense.destroy({ where: { id: expenseId} });
    console.log("Expense deleted successfully");
}
