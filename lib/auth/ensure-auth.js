/* eslint no-console: "off" */
const tokenService = require('./token-service');

module.exports = function getEnsureAuth() {

  return function ensureAuth(req, res, next) {
    const token = req.get('Authorization');
    if(!token) return next({ code: 401, error: 'no authorization found'});

    tokenService.verify(token)
      .then(payload => {
        req.user = payload;
        next();
      }, () => {
        next({ code: 401, error: 'no authorization found'});
      })
      .catch(err => {
        console.log('we didn\'t expect to get here, unexpected next() failure', err);
      });
  };
};