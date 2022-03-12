import dbConnect from '../../util/mongo'
import User from '../../models/User'
import { verifyToken } from '../../verifyToken'

export default verifyToken(async function handler(req, res) {
  const { method } = req

  dbConnect()

  if (method === 'GET') {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  }
})
