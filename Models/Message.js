const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    //required:true
  }
});

const message = mongoose.model('message', messageSchema);
module.exports = message;
