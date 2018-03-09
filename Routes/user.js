const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');
const Message = require('../models/Message');


// Käyttäjän poistoon tokenin tarkistus, jwt.verifyn avulla poisto!


router.post('/login', function(req, res) {
  User.find({'username' : req.body.username}).findOne({"password" : req.body.password}).then(user => handleLogin(req, res, user))
});

// User taulun get all
router.get('/', (req, res) => {
  User.find().then(results => res.json({
    results
  }))
});

// uusi käyttäjä User tauluun, reitti voi muuttua!
router.post('/', (req, res) => {
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }
  new User(newUser).save();
  res.json({
    success: true, message: "New user created"
  })
})

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
