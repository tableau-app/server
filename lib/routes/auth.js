const router = require('express').Router();
const User = require('../models/user');
const ensureAuth = require('../auth/ensure-auth')();
const tokenService = require('../auth/token-service');

function hasUsernameAndPassword(req, res, next) {
  const user = req.body;
  if (!user.username || !user.password) {
    return next({ code: 401, error: 'Username and password required' });
  }
  next();
}

router
  .get('/verify', ensureAuth, (req, res) => {
    res.send({ valid: true });
  })

  .post('/signup', hasUsernameAndPassword, (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    delete req.body.password;
    User.exists({ username })
      .then(exists => {
        if (exists) { throw { code: 400, error: 'username already exists' }; }

        const user = new User({ username });
        user.generateHash(password);
        return user.save();
      })
      .then(user => tokenService.sign(user))
      .then(token => res.send({ token }))
      .catch(next);
  })

  .post('/signin', hasUsernameAndPassword, (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    delete req.body.password;

    User.findOne({ username })
      .then(user => {
        if (!user || !user.comparePassword(password)) {
          throw { code: 401, error: 'invalid email or password' };
        }
        return user;
      })
      .then(user => tokenService.sign(user))
      .then(token => res.send({ token }))
      .catch(next);
  });

module.exports = router;