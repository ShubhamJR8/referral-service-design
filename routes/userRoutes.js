const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController.js');
const { validateRegister, validateLogin } = require('../middleware/validators.js'); // Validation middleware
const router = express.Router();

// User Registration
// Validates registration data before passing to the controller
router.post('/register', validateRegister, registerUser);

// User Login
// Validates login data before passing to the controller
router.post('/login', validateLogin, loginUser);

module.exports = router;

