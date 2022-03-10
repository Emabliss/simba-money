// import { verify } from 'jsonwebtoken'
const jwt = require('jsonwebtoken')

export const verifyToken = (fn) => async (req, res) => {
  jwt.verify(
    req.cookies.auth,
    process.env.JWT_SECRET,
    async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res)
      } else {
        res.status(401).json({ message: 'Sorry you are not authenticated' })
      }
    }
  )
}
