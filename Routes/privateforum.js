const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Pusher = require('pusher');

// User voi hakea omat viestit hyödyntäen tokenia?
// Viestin poistoon tokenin tarkistus, jwt.verifyn avulla poisto!



const pusher = new Pusher({
  appId: '485320',
  key: 'a0baf500d9f8ab951ca1',
  secret: '64d9f476a687c5fd35c2',
  cluster: 'eu',
  encrypted: true
});

router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }
    else {
      Message.find().then(results => res.send({
        success: true, results
      }))
    }
  })
})

router.post('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }
    else {
      const newMessage = {
        text: req.body.text,
        username: authData.user.username,
        date: req.body.date
      }
      new Message(newMessage).save();
      res.json({
        success: true, message: 'Thank you for posting'
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



module.exports = router;
