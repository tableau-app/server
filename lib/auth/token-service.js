const jwt = require('jsonwebtoken-promisified');

const APP_SECRET = process.env.APP_SECRET;

module.exports = {
  sign(user) {
    const payload = {
      id: user._id
    };
    
    return jwt.signAsync(payload, APP_SECRET);
  },
  verify(token) {
    return jwt.verifyAsync(token, APP_SECRET);
  }
};

