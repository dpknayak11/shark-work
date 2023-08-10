const express = require('express');
const path = require('path');
const User = require('../model/user');
const fs = require('fs')

exports.getUser = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'user_form.html'));
};

exports.postUser = (req, res, next) => {
    const userData = req.body;
    const { name, email, password } = userData;
    
    User.findOrCreate({ where: { email }, defaults: { name, password } })
        .then(([user, create]) => {
            if (create) { res.json({ message: 'User created' }) }
            else { res.json({ message: 'User existing' }); }
        }).catch((err) => { console.error(err)});
}