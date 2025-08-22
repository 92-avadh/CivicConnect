import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google users
  role: { type: String, enum: ['citizen', 'official'], default: 'citizen' },
  googleId: { type: String }, // for OAuth users
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
