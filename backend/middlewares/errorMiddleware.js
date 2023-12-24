const notFoundMiddleware = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorMiddleware = (err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  notFoundMiddleware,
  errorMiddleware,
};
