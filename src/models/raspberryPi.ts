import mongoose from 'mongoose';

const raspberryPiSchema = new mongoose.Schema({
  raspberryPiId: {
    type: String,
    required: true,
    unique: true,
  },
  deviceName: {
    type: String,
    required: false,
    default: 'My Device',
  },
  deviceModel: {
    type: String,
    required: false,
    default: 'Raspberry Pi',
  },
  location: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
raspberryPiSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const RaspberryPi = mongoose.models.RaspberryPi || mongoose.model('RaspberryPi', raspberryPiSchema);

export default RaspberryPi;
