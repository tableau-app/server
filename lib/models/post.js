const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

  user: {
    type: String,
    required: true
  },
  image: {
    type: String,
    // media: {
    //   binaryEncoding: base64,
    //   type: image / png
    // },
    required: true
  },
  comments: {
    type: String,
    required: false
  }

});

module.exports = mongoose.model('Post', schema);