const express = require('express');
const path = require('path');
const router = express.Router();
const viewPath = require('../utils/path')

router.get('/contactus', (req, res, next) =>{
    res.sendFile(viewPath('contactus.html'));
  
});

  router.post('/success', (req,res,next) => {
    res.send('<h1> Form Successfully filled! </h1>');
  });

module.exports = router;