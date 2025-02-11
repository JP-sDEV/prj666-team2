const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the model
// Check if the model is already defined to prevent overwriting
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
