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
      minlength: 7,
    },
    transactions: {
      type: Array,
      default: [],
    },
    dollarBalance: {
      type: Number,
      default: 1000,
    },
    euroBalance: {
      type: Number,
      default: 0,
    },
    nairaBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
