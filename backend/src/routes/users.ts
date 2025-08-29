import express, { Request, Response } from "express"
import User from "../models/user"
import jwt from 'jsonwebtoken'
import { check, validationResult } from "express-validator"
import verifyToken from "../middleware/auth"

const router = express.Router()

router.get('/me', verifyToken, async (req: Request, res: Response) => {
 const userId = req.userId

 try {
  const user = await User.findById(userId).select('-password')
  if (!user) {
   res.status(400).json({ message: 'User font found' })
   return
  }
  res.json(user)
  return

 } catch (err) {
  console.log(err)
  res.status(500).json({ message: 'Something went wrong!' })
  return
 }
})

//  /api/users/register
router.post('/register',
 [
  check('firstName', 'First name with 3 to 20 chars, required!').isString().isLength({ min: 3, max: 20 }),
  check('lastName', 'Last name with 3 to 20 chars, required!').isString().isLength({ min: 3, max: 20 }),
  check('email', 'Email in correct format, required!').isEmail(),
  check('password', 'Password with 6 to 20 chars, required!').isLength({ min: 6, max: 20 })
 ],
 async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
   const err = errors.array()
   res.status(400).json({ message: err[0].msg })
   return
  }

  try {
   let user = await User.findOne({
    email: req.body.email
   })

   if (user) {
    res.status(400).json({ message: 'User alreaddy exists!' })
    return
   }

   user = new User(req.body)
   await user.save()

   const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: '1d' }
   )

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
 })

export default router;