const express = require('express');
const router = express.Router();
const { validateCreateReferral } = require('../middleware/validators.js'); // Validation middleware
const { validateReferralUpdate } = require('../middleware/validators.js');
// const { validateEnvVars } = require('./config/validateEnvVars');
// const userController = require('./controllers/userController');
// const { validateRegister, validateLogin } = require('./middleware/validators');
// const { authenticateToken } = require('./middleware/authenticateToken');
// const { authorizeRole } = require('./middleware/authorizeRole');
// const { ROLE } = require('./config/constants');
// const referralController = require('./controllers/referralController');
// const { validateReferral } = require('./middleware/validators');
// const { validateReferralUpdate } = require('./middleware/validators');
// const { validateReferralStatusUpdate } = require('./middleware/validators');
// const { validateReferralId } = require('./middleware/validators');
// const { validateReferralCode } = require('./middleware/validators');
const { createReferral } = require('../controllers/referralController.js');
const { updateReferralStatus } = require('../controllers/referralController.js');

// Create Referral API
router.post('/create', validateCreateReferral, createReferral); // Use the createReferral function for the endpoint
router.patch('/update/:id', validateReferralUpdate, updateReferralStatus);

module.exports = router;