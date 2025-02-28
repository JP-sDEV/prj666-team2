import mongoose from 'mongoose';

// Check if we're in a build environment
const isBuildProcess =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';

const SensorDataSchema = new mongoose.Schema({
  raspberryPi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RaspberryPi',
    required: true,
  },
  temperature: { type: mongoose.Decimal128, required: true },
  humidity: { type: mongoose.Decimal128, required: true },
  moisture: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  timestamp: { type: Date, required: true },
});

// Export the model, but only create it if we're not in a build process
let SensorData;

// Skip model creation during build to avoid MongoDB connection errors
if (!isBuildProcess) {
  SensorData = mongoose.models.SensorData || mongoose.model('SensorData', SensorDataSchema);
} else {
  // During build, provide a mock model that won't try to connect to MongoDB
  // Use a simple object with methods that return null or empty arrays
  SensorData = {
    findOne: function () {
      return null;
    },
    findById: function () {
      return null;
    },
    find: function () {
      return [];
    },
    save: function () {
      return {};
    },
    // Add other methods as needed
  };

  // Also provide a constructor-like function
  SensorData.prototype = {
    save: function () {
      return {};
    },
  };

  // Make it callable as a constructor
  SensorData = function () {
    return {
      save: function () {
        return {};
      },
    };
  };
}

export { SensorData };
