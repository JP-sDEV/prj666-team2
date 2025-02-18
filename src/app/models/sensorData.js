const mongoose = require('mongoose');

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

// Export the model
// Check if the model is already defined to prevent overwriting
const SensorData = mongoose.models.SensorData || mongoose.model('SensorData', SensorDataSchema);

module.exports = SensorData;
