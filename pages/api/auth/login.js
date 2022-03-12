import dbConnect from '../../../util/mongo'
import User from '../../../models/User'
import cookie from 'cookie'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

const handler = async (req, res) => {
  const { method } = req

  dbConnect()

  if (req.method === 'POST') {
    const { email, password } = req.body
    try {
      const user = await User.findOne({
        email: email,
      })

      !user && res.status(404).json('User not found')

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      !validPassword && res.status(400).json('Wrong password')

      const claims = {
        sub: user._id,
        myEmail: user.email,
        transactions: user.transactions,
        dollar: user.dollarBalance,
        euro: user.euroBalance,
        naira: user.nairaBalance,
        username: user.username,
      }
      const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: '1h' })

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/',
        })
      )

      const { password, ...others } = user._doc

      res.status(200).json({ ...others, jwt })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

export default handler
