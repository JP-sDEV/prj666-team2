const mongoose = require('mongoose');

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

// Export the model
const Notification =
  mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
