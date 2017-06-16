const Router = require('express').Router;
const router = Router();
const Post = require('../models/post');

router
  .get('/', (req, res, next) => {
    Post.find({})
      .lean()
      .populate({
        path: 'user',
        select: 'username'
      })
      .populate({
        path: 'comments.user',
        select: 'username'
      })
      .then(posts => res.send(posts))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    req.body.user = req.user.id;
    Post.create(req.body)
      .then(post => res.send(post))
      .catch(next);
  })

  .post('/:id/likes', (req, res, next) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id, { $addToSet:  { likes: { $each: [req.user.id] } } }, { new: true })
      .then(post => res.send({likes: post.likes}))
      .catch(next);
  })

  .post('/:id/comments', (req, res, next) => {
    const id = req.params.id;
    Post.findByIdAndUpdate(id, {
      $push: {
        comments: {
          user: req.user.id,
          text: req.body.comment
        }
      }
    })
      .then(() => Post.findById(id)
        .lean()
        .select('comments')
        .populate({
          path: 'comments.user',
          select: 'username'
        })
      )
      .then(post => res.send(post.comments))
      .catch(next);
  });

module.exports = router;