import mongoose from 'mongoose';

// Check if we're in a build environment
const isBuildProcess =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // passwordHash is optional for Google login
  googleId: { type: String }, // For Google login users
  authProvider: {
    type: String,
    enum: ['email', 'google'], // Auth provider type (email or google)
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the model, but only create it if we're not in a build process
let User;

// Skip model creation during build to avoid MongoDB connection errors
if (!isBuildProcess) {
  User = mongoose.models.User || mongoose.model('User', UserSchema);
} else {
  // During build, provide a mock model that won't try to connect to MongoDB
  // Use a simple object with methods that return null or empty arrays
  User = {
    findOne: function () {
      return null;
    },
    findById: function () {
      return { _id: 'mock-id' };
    },
    find: function () {
      return [];
    },
    // Add other methods as needed
  };
}

export { User };
