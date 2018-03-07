const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');


// Pitää tehdä oma message model ja joku tapa viitata viesteihin.
// User voi hakea omat viestit hyödyntäen tokenia?
// Uuden viestin kirjoitukseen tokenin tarkastus!
// Käyttäjän poistoon tokenin tarkistus, jwt.verifyn avulla poisto!
// Viestin poistoon tokenin tarkistus, jwt.verifyn avulla poisto!


router.post('/login', function(req, res) {
  User.find({'username' : req.body.username}).findOne({"password" : req.body.password}).then(user => handleLogin(req, res, user))
});

// User taulun get all
router.get('/all', (req, res) => {
  User.find().then(results => res.json({
    results
  }))
});

// uusi käyttäjä User tauluun, reitti voi muuttua!
router.post('/newUser', (req, res) => {
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

// verifyToken testi
router.get('/pena', verifyToken, function(req, res) {
  res.send({
    pena: "pena"
  })
})


// jwt.verify testaamista, authData pitää sisällään tokenin omistajan tiedot kuten kuuluukin
router.get('/posts', verifyToken, function(req, res) {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }
    else {
      res.json({
        message: 'Information fetched',
        authData
      })
    }
  })
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
