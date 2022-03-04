import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    transactions: {
      type: Array,
      default: [],
    },
    balance: {
      type: Number,
      default: 1000,
    },
    currency: {
      type: String,
      default: 'USD',
    },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)