const Referral = require('../models/Referral.js'); // Import the Referral model

// Update Referral Status after redeemed
const updateReferralStatusAfterRedeemed = async (referralCode) => {
  try {
    const referral = await Referral.findOneAndUpdate(
      { referralCode, status: "active" },
      { status: "redeemed" },
      { new: true }
    );

    if (referral) {
      console.log(`Referral with code ${referralCode} has been redeemed.`);
    }
  } catch (error) {
    console.error(
      `Error updating referral status for code ${referralCode}:`,
      error
    );
  }
};

module.exports = {
  updateReferralStatusAfterRedeemed,
};