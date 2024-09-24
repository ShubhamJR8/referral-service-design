const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from headers

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info to request
    next(); // Continue to the next middleware or route
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' }); // Token is invalid
  }
};

module.exports = authMiddleware;
