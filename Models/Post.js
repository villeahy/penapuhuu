const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required:true
  }
});

const post = mongoose.model('post', postSchema);
module.exports = post;
