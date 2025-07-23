import express, { Request, Response } from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel from '../models/hotel'
import verifyToken from '../middleware/auth'
import { body } from 'express-validator'
import { HotelType } from '../shared/types'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
 storage: storage,
 limits: {
  fileSize: 5 * 1024 * 1024  //5MB
 }
})

//api/my-hotels 
router.post('/', verifyToken, [
 body('name').notEmpty().withMessage('Name is required!'),
 body('city').notEmpty().withMessage('City is required!'),
 body('country').notEmpty().withMessage('Country is required!'),
 body('pricePerNight').notEmpty().isNumeric().withMessage('Price per night must be a number!'),
 body('description').notEmpty().withMessage('Description is required!'),
 body('type').notEmpty().withMessage('Hotel type is required!'),
 body('facilities').notEmpty().isArray().withMessage('Atleast one facility is required!'),
],
 upload.array('imageFiles', 6),

 async (req: Request, res: Response) => {
  try {
   const imageFiles = req.files as Express.Multer.File[]

   const newHotel: HotelType = req.body

   //1. upload images to cloudinary
   const imageUrls = await uploadImages(imageFiles)

   //2. if upload successful, add the URLs to the new hotel
   newHotel.imageUrls = imageUrls
   newHotel.lastUpdated = new Date()
   newHotel.userId = req.userId

   //3. save the new hotel in our database
   const hotel = new Hotel(newHotel)
   await hotel.save()

   //4. return a 201 status
   res.status(201).send(hotel)

  } catch (err) {
   console.log('Error creating hotel', err)
   res.status(500).json({ message: 'Err creating hotel!' })
  }
 })



router.get('/', verifyToken, async (req: Request, res: Response) => {
 try {
  const hotels = await Hotel.find({ userId: req.userId })
  res.json(hotels)
  return
 } catch (err) {
  console.log('Err fetching hotels:' + err)
  res.status(500).json({ message: 'Err fetching hotels!' })
  return
 }
})


router.get('/:id', verifyToken, async (req: Request, res: Response) => {
 const id = req.params.id.toString()
 try {
  const hotel = await Hotel.findOne({
   _id: id,
   userId: req.userId
  })
  res.json(hotel)
  return
 } catch (err) {
  console.log('Err fetching user hotels: ' + err)
  res.status(500).json({ message: 'Error fetching hotel!' })
 }
})


router.put('/:hotelId', verifyToken, upload.array('imageFiles', 6), async (req: Request, res: Response) => {
 try {
  const updatedHotel: HotelType = req.body
  updatedHotel.lastUpdated = new Date()

  const hotel = await Hotel.findOneAndUpdate({
   _id: req.params.hotelId,
   userId: req.userId
  },
   updatedHotel,
   { new: true }
  )

  if (!hotel) {
   res.status(404).json({ message: 'Hotel not found:[backend/src/routes/my-hotels/router.put]' })
   return
  }

  const files = req.files as Express.Multer.File[]
  const updatedImageUrls = await uploadImages(files)

  hotel.imageUrls = [
   ...updatedImageUrls,
   ...(updatedHotel.imageUrls || [])
  ]

  await hotel.save()
  res.status(201).json(hotel)
  return
 } catch (err) {
  console.log('Err updating hotel:[backend/src/routes/my-hotels/router.put] ' + err)
  res.status(500).json({ message: 'Err updating hotel:[backend/src/routes/my-hotels/router.put]' })
 }
})


async function uploadImages(imageFiles: Express.Multer.File[]) {
 const uploadPromises = imageFiles.map(async (image) => {
  const b64 = Buffer.from(image.buffer).toString('base64')
  let dataURI = 'data:' + image.mimetype + ';base64,' + b64
  const res = await cloudinary.v2.uploader.upload(dataURI)
  return res.url
 })

 const imageUrls = await Promise.all(uploadPromises)
 return imageUrls
}


export default router;
