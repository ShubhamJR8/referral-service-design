const Referral = require('../models/Referral.js'); // Import the Referral model
const User = require('../models/User.js');
const { v4: uuidv4 } = require('uuid');

// Create Referral Controller
const createReferral = async (req, res) => {
  const { userId, customCode } = req.body;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ error: "Invalid user ID." });
  }

  try {
    // Generate or use custom referral code
    const referralCode = customCode || uuidv4(); 

    // Create new referral record
    const referral = await Referral.create({
      userId,
      referralCode,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({
      referralId: referral._id, // Use _id for MongoDB
      referralCode: referral.referralCode,
      message: "Referral code created successfully."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create referral code." });
  }
};

module.exports = {
  createReferral,
};
