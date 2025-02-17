const mongoose = require('mongoose');

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
      unique: true, // Ensures serialId is unique
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export the model
const RaspberryPi = mongoose.models.RaspberryPi || mongoose.model('RaspberryPi', RaspberryPiSchema);

module.exports = RaspberryPi;
