import dbConnect from '../../../util/mongo'
import User from '../../../models/User'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const { method } = req

  dbConnect()

  if (method === 'POST') {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(req.body.password, salt)
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      })
      const allUsers = await User.find()
      const compareEmail = allUsers.some(
        (singleUser) => singleUser.email === req.body.email
      )
      const compareUsername = allUsers.some(
        (singleUser) => singleUser.username === req.body.username
      )
      if (compareEmail) {
        res.status(500).json('Email already exists')
      }
      if (compareUsername) {
        res.status(500).json('Username already exists')
      } else {
        const user = await User.create(newUser)
        res.status(201).json(user)
      }
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
