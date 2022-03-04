import dbConnect from '../../util/mongo'
import User from '../../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const { method } = req

  dbConnect()

  if (method === 'POST') {
    try {
      const user = await User.findOne({
        email: req.body.email,
      })
      !user && res.status(400).json('Wrong credentials!')

      const validated = await bcrypt.compare(req.body.password, user.password)
      !validated && res.status(400).json('Wrong credentials!')

      // Generate access token
      const accessToken = jwt.sign(
        { username: user.username, email: user.email },
        process.env.JWT_SECRET
      )
      res.status(200).json({
        username: user.username,
        email: user.email,
        accessToken,
      })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
