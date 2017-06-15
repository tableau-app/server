const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

  user: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: String,
  comments: Array
});

module.exports = mongoose.model('Post', schema);