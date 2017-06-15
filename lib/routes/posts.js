const Router = require('express').Router;
const router = Router();
// const User = require('../models/user');
const Post = require('../models/post');

router
  .get('/', (req, res, next) => {
    Post.find({})
      .lean()
      .then(posts => res.send(posts))
      .catch(next);
  });

// .post('/posts', (req, res, next) => {
//   Post.create(req.body)
//     .then(post => res.send(post))
//     .catch(next);
// });

module.exports = router;