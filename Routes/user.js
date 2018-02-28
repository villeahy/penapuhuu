const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');



router.get('/', (req, res) => {
  User.find().then(results =>res.json({success: true, Users:results}))
});

router.get('/:id', function(req, res) {
  User.find({'_id': req.params.id}).then(results =>res.send(results))
});

router.post('/', (req, res) =>{
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  }
  new User(newUser).save();
return res.json({success: true, message: 'Thank you for adding.'})
})

 module.exports = router;
