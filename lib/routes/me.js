const Router = require('express').Router;
const router = Router();
const User = require('../models/user');

router
  .get('/', (req, res, next) => {
    User.findById(req.user.id)
      .lean()
      // ACK! don't return the user's password hash
      .select('-password')
      .then(user => res.send(user))
      .catch(next);
  });

module.exports = router;