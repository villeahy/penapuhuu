const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');


//Palauttaa tyhjää???
router.post('/', function(req, res) {
  console.log("EKA")
  Post.find({'username' : req.body.username}).where({'password:': req.body.password}).then(user => {
      console.log("functiossa");
      console.log(user);
        const token = jwt.sign({user}, 'secretkey', (err, token) => {
          if(err) {
            console.log(err)
            res.send({
              success: false, message: "User not found"
            })
          }
          else {
            res.json({
              token
        })
          }
      })
  })
})

module.exports = router;
