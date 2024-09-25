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

// Update Referral Status
const updateReferralStatus = async (req, res) => {
  const referralId = req.params.id;
  const { status } = req.body;

  if (!['active', 'inactive'].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const referral = await Referral.findByIdAndUpdate(
      referralId,
      { status },
      { new: true }
    );

    if (!referral) {
      return res.status(404).json({ error: "Referral not found" });
    }

    res.status(200).json(referral);
  } catch (error) {
    res.status(500).json({ error: "Failed to update referral status" });
  }
};

module.exports = {
  createReferral,
  updateReferralStatus,
};
