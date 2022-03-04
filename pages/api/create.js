import dbConnect from '../../util/mongo'
import Transaction from '../../models/Transaction'
import User from '../../models/User'
// import CC from 'currency-converter-lt'

export default async function handler(req, res) {
  const { method } = req

  dbConnect()

  if (method === 'POST') {
    try {
      const transaction = await Transaction.create(req.body)

      const users = await User.find()
      const sender = users.find((user) => user.username === req.body.senderName)
      const receiver = users.find(
        (user) => user.username === req.body.receiverName
      )

      //   Your expenses must be less than your balance
      if (req.body.value < sender.balance) {
        // Check currency
        // let fromCurrency
        // const toCurrency = 'USD'
        // if (transaction.currencyUsed === 2) {
        //   fromCurrency = 'EUR'
        //   const currencyConverter = new CC({
        //     from: fromCurrency,
        //     to: toCurrency,
        //     amount: transaction.value,
        //   })
        //   currencyConverter.convert().then((response) => {
        //     console.log(response)
        //   })
        // }
        let convert
        if (transaction.currencyUsed === 3) {
          convert = transaction.value / 1.8
        }
        // if (transaction.currencyUsed === 4) {
        // }

        //   Update users balances and transactions array
        await User.findByIdAndUpdate(sender._id, {
          $inc: { balance: -convert },
        })
        await User.findByIdAndUpdate(sender._id, {
          $push: { transactions: transaction._id },
        })
        await User.findByIdAndUpdate(receiver._id, {
          $inc: { balance: convert },
        })
        await User.findByIdAndUpdate(receiver._id, {
          $push: { transactions: transaction._id },
        })
        res.status(401).json(transaction)
      } else {
        res.status(500).json('You can not send more than you have')
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
