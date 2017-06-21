const router = require('express').Router();
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET_NAME;

router.put('/', (req, res, next) => {
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

  s3.getSignedUrl('putObject', s3Params).promise()
    .then(data => res.json({
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    }))
    .catch(next);
});

module.exports = router;
