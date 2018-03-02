const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');



router.get('/', (req, res) => {
  Post.find().then(results =>res.json({success: true, Posts:results}))
});

router.get('/:id', function(req, res) {
  Post.find({'_id': req.params.id}).then(results =>res.send({success: true, Post:results}))
});

router.post('/', (req, res) =>{
  const newPost = {
    text: req.body.text,
    password: req.body.password,
    username: req.body.username,
    date: req.body.date
  }
  console.log(newPost)
  new Post(newPost).save();
return res.json({success: true, message: 'Thank you for adding.'})
})

 module.exports = router;
