import express from 'express'
import {
	addNewCategory,
	createCategory,
	deleteCategory,
	getAllCategories,
	updateCategory,
} from '../controllers/categories.js'

const categoryRouter = express.Router()

categoryRouter.get('/getall', getAllCategories)
categoryRouter.post('/create', createCategory)
categoryRouter.patch('/', updateCategory)
categoryRouter.post('/add', addNewCategory)
categoryRouter.post('/delete', deleteCategory)

export default categoryRouter
