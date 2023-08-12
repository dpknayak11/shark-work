const express = require('express');
const path = require('path');
const User = require('../model/user');
const fs = require('fs')

function valid(string){
    if(string == undefined || string.length === 0){ return true;}
    else { return false;}
}

exports.getUser = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../','public','views','singup.html'));
};

exports.getSingIn = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../','public','views','singin.html'));
};

exports.postUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      if (valid(name) || valid(email) || valid(password)) {
        return res.json({ message: "something is missing!" })
      }
      const user = await User.findOne({ where: { email: email } });
      if (user) { return res.json({ message: "User already exists!" })}

      await User.create({ name, email, password });
      res.json({ message: " created new user!" });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.postSingIn = async (req, res, next) => {
    const {email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: email, password: password } })
      if (user) { return res.json({ message: "User SingIn Done !" })          
        }
      else res.json({ message: "Email and Password wrong!" })
    } catch (err) {
      res.status(500).json(err);
    }
  };