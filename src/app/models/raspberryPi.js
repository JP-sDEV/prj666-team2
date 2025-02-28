import mongoose from 'mongoose';

// Check if we're in a build environment
const isBuildProcess =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';

// Define the schema
const RaspberryPiSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    serialId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export the model, but only create it if we're not in a build process
let RaspberryPi;

// Skip model creation during build to avoid MongoDB connection errors
if (!isBuildProcess) {
  RaspberryPi = mongoose.models.RaspberryPi || mongoose.model('RaspberryPi', RaspberryPiSchema);
} else {
  // During build, provide a mock model that won't try to connect to MongoDB
  // Use a simple object with methods that return null or empty arrays
  RaspberryPi = {
    findOne: function () {
      return {
        lean: function () {
          return null;
        },
      };
    },
    findById: function () {
      return null;
    },
    find: function () {
      return [];
    },
    // Add other methods as needed
  };
}

export { RaspberryPi };
