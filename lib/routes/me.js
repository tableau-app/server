const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const Post = require('../models/Post');

router
  .get('/', (req, res, next) => {
    User.findById(req.user.id)
      .lean()
      .then(user => res.send(user))
      .catch(next);
  })

  .post('/posts', (req, res, next) => {
    Post.create(req.body)
      .then(post => res.send(post))
      .catch(next);
  });

module.exports = router;