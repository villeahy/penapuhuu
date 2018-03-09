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

function postMap(posts, user){
  return posts.map(post=>({username: post.username, text: post.text, date:post.date, id:post._id, hasRemove: user.username === post.username}));
}

router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }
    else {
      Message.find().then(results => res.send({
        success: true, posts: postMap(results,authData.user)
      }))
    }
  })
})

//Delete
router.post('/:id',verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    }else{
      console.log(req.params.id)
      Message.find({username: authData.user.username}).find({'_id':req.params.id}).then(removed => {
        res.send({success:true, message:'Post removed'})
        pusher.trigger('forum', 'private-delete', {
          'success': true,
          'message': 'Post removed',
          'post': JSON.stringify(removed)
        })
      })
    }
    Message.find({username: authData.user.username}).remove({'_id':req.params.id},function(err){
      if(err) return handleError(err);
    })
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
      new Message(newMessage).save().then(post=>{
        console.log(authData)
        pusher.trigger('forum', 'private-add', {
          'success': true,
          'message': 'Post removed',
          'post': JSON.stringify({username: post.username, text: post.text, date:post.date, id:post._id, hasRemove: authData.user.username === post.username})
        })
      });
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
