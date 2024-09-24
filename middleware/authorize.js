const authorize = (roles = []) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Get the role from the authenticated user
  
      // Check if the user's role is in the allowed roles
      if (roles.length && !roles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource.' });
      }
  
      next(); // User has permission, proceed to the next middleware or route
    };
  };
  
  module.exports = authorize;
  