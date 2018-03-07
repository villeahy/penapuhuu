const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');


//Palauttaa tyhjää???
router.post('/login', function(req, res) {
  Post.find({'username' : req.body.username}).findOne({"password" : req.body.password}).then(user => handleLogin(req, res, user))
})

function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}


function handleLogin(req, res, user) {
  if(user == null){
    res.send({
      success: false, message: "User not found"
    })
  }
  else {
    const token = jwt.sign({user}, 'secretkey', {expiresIn: '1h'}, (err, token) => {
      if(err) {
        res.send({
          success: false, message: "Token signing failed"
        })
      }
      else {
        res.json({
          token
    })
      }
  })
  }
}

module.exports = router;
