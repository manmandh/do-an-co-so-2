import express from 'express'
import { addOrder, deleteOrder, getAllOrders } from '../controllers/orders.js'

const orderRouter = express.Router()

orderRouter.get('/', getAllOrders)
orderRouter.post('/', addOrder)
orderRouter.delete('/', deleteOrder)

export default orderRouter
