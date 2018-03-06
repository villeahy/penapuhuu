const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '485320',
  key: 'a0baf500d9f8ab951ca1',
  secret: '64d9f476a687c5fd35c2',
  cluster: 'eu',
  encrypted: true
});
function postMap(posts){
  return posts.map(post=>({username: post.username, text: post.text, date:post.date, id:post._id, hasRemove:typeof post.password==='string'}));
}

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});

router.get('/', (req, res) => {
  Post.find().then(results => res.send({success:true, posts:postMap(results)}))
});

router.get('/:id', function(req, res) {
  Post.find({'_id': req.params.id}).then(results =>res.send({success: true, posts:postMap(results)}))
});

//Delete
router.post('/:id', function(req, res) {
  console.log(req.body.password)
  Post.find({'_id': req.params.id}).where({'password':req.body.password}).then(removed =>{
    res.send({success:true, message:'Post removed'})
    pusher.trigger('forum', 'delete', {
      'success': true,
      'message': 'Post removed',
      'post': JSON.stringify(removed)
    });
  });
  Post.find({password:req.body.password}).remove({_id:req.params.id},function(err){
    if(err) return handleError(err);
  })
  /*Post.remove({_id:req.params.id}, function (err) {
  if (err) return handleError(err);
});*/
})

router.post('/', (req, res) =>{
  const newPost = {
    text: req.body.text,
    password: req.body.password,
    username: req.body.username,
    date: req.body.date
  }
  new Post(newPost).save().then(post =>{
    pusher.trigger('forum', 'add', {
      'success': true,
      'message': 'Post added',
      'post': JSON.stringify({username: post.username, text:post.text, date:post.date, id:post._id, hasRemove:typeof post.password==='string'})
    });
  });
res.json({success: true, message: 'Thank you for adding.'})
})

 module.exports = router;
