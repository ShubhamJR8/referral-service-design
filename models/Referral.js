const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Assuming you have a User model
  },
  referralCode: {
    type: String,
    required: true,
    unique: true, // Ensures referral codes are unique
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'redeemed'], // Can extend as needed
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 // Expires in 7 days
  }
});

// Optional: Middleware to update `updatedAt` on save
ReferralSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Referral = mongoose.model('Referral', ReferralSchema);

module.exports = Referral;
