import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    currencyUsed: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Transaction ||
  mongoose.model('Transaction', TransactionSchema)
