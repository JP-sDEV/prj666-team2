const mongoose = require('mongoose');

// Check if we're in a build environment
const isBuildProcess =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    raspberryPiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RaspberryPi',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['alert', 'info', 'warning'], // Example of limiting notification types
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export the model, but only create it if we're not in a build process
let Notification;

// Skip model creation during build to avoid MongoDB connection errors
if (!isBuildProcess) {
  Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
} else {
  // During build, provide a mock model that won't try to connect to MongoDB
  Notification = {
    findOne: function () {
      return null;
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

module.exports = Notification;
