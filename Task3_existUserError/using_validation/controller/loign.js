const express = require('express');
const path = require('path');
const User = require('../model/user');

function valid(string){
    if(string == undefined || string.length === 0){ return true;}
    else { return false;}
}

exports.getUser = async (req, res, next) => {
   await res.sendFile(path.join(__dirname, '../', 'views', 'user_form.html'));
};

exports.postUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
      if (valid(name) || valid(email) || valid(password)) {
        return res.status(400).json({ err: "something is missing!" })
      }
      const user = await User.findOne({ email });
      if (user) { return res.status(400).json({ err: "User already exists!" })}

      await User.create({ name, email, password });
      res.status(201).json({ message: " created new user!" });
    } catch (err) {
      res.status(500).json(err);
    }
  };


  