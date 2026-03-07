import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, unique: true, sparse: true },
    password: { type: String },
    image: { type: String, default: "" },
    coverImage: {type: String, default: ""},
    bio: { type: String, default: '' },
    balance: { type: Number, default: 0 },
    isBanned: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    bkashNumber: { type: String, default: '' },
    nagadNumber: { type: String, default: '' },

  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);