import express from 'express'
import {
	addNewCart,
	deleteCart,
	deleteMultipleCart,
	getAllCarts,
} from '../controllers/carts.js'

const cartRouter = express.Router()

cartRouter.get('/', getAllCarts)
cartRouter.post('/', addNewCart)
cartRouter.delete('/', deleteCart)
cartRouter.delete('/multiple', deleteMultipleCart)

export default cartRouter
