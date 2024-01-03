import express from 'express'
import {
	getAllProduct,
	getProductById,
	getProductByName,
	addProduct,
	deleteProduct,
	updateProduct,
	addOption,
	getLimitRecords,
	searchProduct,
} from '../controllers/products.js'

const productRouter = express.Router()

productRouter.get('/getall', getAllProduct)
productRouter.get('/search', searchProduct)
productRouter.get('/limit/:limit', getLimitRecords)
productRouter.post('/', addProduct)
productRouter.get('/id/:id', getProductById)
productRouter.get('/name/:name', getProductByName)
productRouter.post('/delete', deleteProduct)
productRouter.post('/update', updateProduct)
productRouter.post('/option', addOption)

export default productRouter
