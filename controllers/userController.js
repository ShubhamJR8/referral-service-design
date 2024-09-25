const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Referral = require("../models/Referral");
const {
  updateReferralStatusAfterRedeemed,
} = require("../services/referralService");

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, password, role, referralCode } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Create new user (password will be hashed automatically in the model)
    const user = new User({
      name,
      email,
      password,
      role: role || "viewer", // Default to 'viewer' role if not provided
      referralCodeUsed: referralCode || null, // Save the referralCode if provided
    });

    await user.save();

    // If referral code is provided, redeem it
    if (referralCode) {
      const referral = await Referral.findOne({
        referralCode,
        status: "active",
      });

      console.log(referralCode);

      if (!referral) {
        return res
          .status(400)
          .json({ message: "Invalid or inactive referral code" });
      }

      // Redeem the referral code
      await updateReferralStatusAfterRedeemed(referralCode);

      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "User registration failed" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
