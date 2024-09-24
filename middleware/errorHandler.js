const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message || 'Server Error',
      error: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide error stack in production
    });
  };
  
  module.exports = errorHandler;
  