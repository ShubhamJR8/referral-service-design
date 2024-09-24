const validateEnvVars = () => {
    if (!process.env.MONGO_URI) {
      console.error('FATAL ERROR: MONGO_URI is not defined.');
      process.exit(1);
    }
    if (!process.env.JWT_SECRET) {
      console.error('FATAL ERROR: JWT_SECRET is not defined.');
      process.exit(1);
    }
  };
  
  module.exports = { validateEnvVars };
  