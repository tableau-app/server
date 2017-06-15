const express = require('express');
const app = express();
const aws = require('aws-sdk');
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

app.use('/api/auth', auth);
app.use('/api/posts', ensureAuth, posts);
app.use('/api/me', ensureAuth, me);

app.use(getErrorHandler());

const S3_BUCKET = process.env.S3_BUCKET_NAME;

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

module.exports = app;