import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

const newCloudinary = cloudinary.v2

newCloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
	cloudinary: newCloudinary,
	allowedFormats: ['jpg', 'png'],
	params: {
		folder: 'shopcart',
	},
})

const uploadCloud = multer({ storage })

export default uploadCloud
export { newCloudinary }
