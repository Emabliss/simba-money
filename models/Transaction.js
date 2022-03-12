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
    convertedTo: {
      type: Number,
      required: true,
    },
    sourceCurrency: {
      type: String,
      default: 'USD',
    },
    targetCurrency: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Transaction ||
  mongoose.model('Transaction', TransactionSchema)
