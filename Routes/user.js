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
  if (validateEmail(req.body.email)) {
    const newUser = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
    new User(newUser).save(function(err) {
      if(err) {
        res.json({
          success: true, message: "User creation failed, check fields!"
        })
      }
      else {
        res.json({
          success: true, message: "New user created"
        })
      }
    });
  }
  else {
    res.json({
      success: true, message: "Email is invalid!"
    })
  }
})

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
