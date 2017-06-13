const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const schema = new Schema({

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

schema.static('exists', function (query) {
  return this.find(query)
    .count()
    .then(count => (count));
});

schema.method('generateHash', function (password) {
  this.password = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function (password) {
  return bcrypt.compareSync(password, this.password);
});

module.exports = mongoose.model('User', schema);
