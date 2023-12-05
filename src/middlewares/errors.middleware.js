const { ValidationError } = require("sequelize");

function handleErrors(err, req, res, next) {
  return res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomHandleErrors(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function ormHandleErrors(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      name: err.name,
      errors: err.errors,
      message: err.message,
      stack: err.stack,
    });
  } else {
    next(err);
  }
}

module.exports = {
  handleErrors,
  boomHandleErrors,
  ormHandleErrors,
};
