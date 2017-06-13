/* eslint no-console: "off" */
function getErrorHandler(log = console.log) {

// eslint-disable-next-line 
  return function errorHandler(err, req, res, next) {

    let code, error;

    if (err.errors) {
      const validations = err.errors;
      code = 400;
      error = Object.keys(validations).reduce((messages, key) => {
        messages.push(validations[key].message);
        return messages;
      }, []);
    }

    else if (err.code) {
      code = err.code;
      error = err.error;
    }
    else {
      code = 500;
      error = 'Internal Server Error';
      log(err);
    }

    res.status(code).send({ error });
  };
}

module.exports = getErrorHandler;
