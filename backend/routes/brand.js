import express from 'express'
import { createBrand, getAllBrands } from '../controllers/brands.js'

const brandRouter = express.Router()

brandRouter.post('/', createBrand)
brandRouter.get('/getall', getAllBrands)

export default brandRouter
