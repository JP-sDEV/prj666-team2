import mongoose from 'mongoose';

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

// Export the model
// Check if the model is already defined to prevent overwriting
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export { User };
