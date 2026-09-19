const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  if (err.name === 'CastError') {
    error = new Error('Resource not found / Invalid ID');
    error.statusCode = 404;
  }
  if (err.code === 11000) {
    error = new Error('Duplicate field value entered');
    error.statusCode = 400;
  }
  if (err.name === 'ValidationError') {
    error = new Error(Object.values(err.errors).map(v => v.message).join(', '));
    error.statusCode = 400;
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    error = new Error('Not authorized, token failed');
    error.statusCode = 401;
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;