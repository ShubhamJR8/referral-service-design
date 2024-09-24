const { body, validationResult } = require('express-validator');

// User registration validation
const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'viewer', 'editor']).withMessage('Invalid role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// User login validation
const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Referral creation validation
const validateCreateReferral = [
  body('userId')
    .isMongoId().withMessage('Invalid user ID format.'), // Validate that userId is a MongoDB ObjectId
  body('customCode')
    .optional() // Allow customCode to be optional
    .isString()
    .isLength({ min: 1 }).withMessage('Custom code must be a non-empty string.'), // Validate that customCode is a non-empty string
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateRegister, validateLogin, validateCreateReferral };
