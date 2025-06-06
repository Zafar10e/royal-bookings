import express, { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import verifyToken from '../middleware/auth'

const router = express.Router()

router.post('/login', [
 check('email', 'Email correct format, required!').isEmail(),
 check('password', 'Password with 6 to 20 chars required!').isLength({ min: 6, max: 20 })
],
 async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
   const err = errors.array()
   res.status(400).json({ message: err[0].msg })
   return
  }

  const { email, password } = req.body

  try {
   const user = await User.findOne({ email })
   if (!user) {
    res.status(400).json({ message: 'Invalid Email!' })
    return
   }

   const isMatched = await bcrypt.compare(password, user.password)
   if (!isMatched) {
    res.status(400).json({ message: 'Invalid Password!' })
    return
   }

   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' })

   res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 86400000
   })

   res.status(200).json({ userName: user.firstName + ' ' + user.lastName })
   return

  } catch (err) {
   res.status(500).json({ message: 'Something went wrong!' })
   return
  }
 });




router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
 res.status(200).json({ userId: req.userId })
 return
});




router.post('/logout', (req: Request, res: Response) => {
 res.cookie('auth_token', '', {
  expires: new Date(0)
 })
 res.status(200).json({ message: 'Logged out!' })
 return
})



export default router;