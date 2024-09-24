require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const referralRoutes = require('./routes/referralRoutes.js');
const errorHandler = require('./middleware/errorHandler.js'); // Custom error handler
const { validateEnvVars } = require('./config/validateEnvVars');

const app = express();

// Validate required environment variables
validateEnvVars();

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection setup with async/await and improved error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/referrals', referralRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server with graceful shutdown
const PORT = process.env.PORT || 5003;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});


