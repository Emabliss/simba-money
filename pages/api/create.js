import dbConnect from '../../util/mongo'
import Transaction from '../../models/Transaction'
import User from '../../models/User'
import { verify } from '../../util/verifyToken'

export default async function handler(req, res) {
  const { method } = req

  dbConnect()

  if (method === 'POST') {
    try {
      await verify(req, res)
      const users = await User.find()
      const sender = users.find((user) => user.username === req.body.senderName)
      const receiver = users.find(
        (user) => user.username === req.body.receiverName
      )
      if (req.body.value < sender.dollarBalance) {
        if (req.body.targetCurrency === 'EUR') {
          // Update sender dollar balance
          await User.findByIdAndUpdate(sender._id, {
            $inc: { dollarBalance: -req.body.value },
          })

          // Update receiver euro balance
          await User.findByIdAndUpdate(receiver._id, {
            $inc: { euroBalance: req.body.value * 0.71 },
          })

          const transaction = await Transaction.create(req.body)

          // Push transaction into sender array
          await User.findByIdAndUpdate(sender._id, {
            $push: { transactions: transaction._id },
          })

          // Push transaction into receiver array
          await User.findByIdAndUpdate(receiver._id, {
            $push: { transactions: transaction._id },
          })
          res.status(201).json(transaction)
        }

        if (req.body.targetCurrency === 'NGN') {
          // Update sender dollar balance
          await User.findByIdAndUpdate(sender._id, {
            $inc: { dollarBalance: -req.body.value },
          })

          // Update receiver naira balance
          await User.findByIdAndUpdate(receiver._id, {
            $inc: { nairaBalance: req.body.value * 418.49 },
          })

          const transaction = await Transaction.create(req.body)

          // Push transaction into sender array
          await User.findByIdAndUpdate(sender._id, {
            $push: { transactions: transaction._id },
          })

          // Push transaction into receiver array
          await User.findByIdAndUpdate(receiver._id, {
            $push: { transactions: transaction._id },
          })
          res.status(201).json(transaction)
        }

        if (req.body.targetCurrency === 'USD') {
          // Update sender dollar balance
          await User.findByIdAndUpdate(sender._id, {
            $inc: { dollarBalance: -req.body.value },
          })

          // Update receiver dollar balance
          await User.findByIdAndUpdate(receiver._id, {
            $inc: { dollarBalance: req.body.value },
          })

          const transaction = await Transaction.create(req.body)

          // Push transaction into sender array
          await User.findByIdAndUpdate(sender._id, {
            $push: { transactions: transaction._id },
          })

          // Push transaction into receiver array
          await User.findByIdAndUpdate(receiver._id, {
            $push: { transactions: transaction._id },
          })
          res.status(201).json(transaction)
        }
      } else {
        res.status(200).json('You can not give more than you have')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
