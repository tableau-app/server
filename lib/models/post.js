const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: String,
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Post', schema);