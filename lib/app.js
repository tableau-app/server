const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const getErrorHandler = require('./error-handlers/error-handler');
const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

const auth = require('./routes/auth');
const posts = require('./routes/posts');
const me = require('./routes/me');
// move s3 stuff to own route file
const s3 = require('./routes/s3');

app.use('/api/auth', auth);
app.use('/api/posts', ensureAuth, posts);
app.use('/api/me', ensureAuth, me);
app.use('/api/s3', s3);

app.use(getErrorHandler());

module.exports = app;