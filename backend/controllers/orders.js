import Order from '../models/Order.js'
import { RESPONSE_FAIL, RESPONSE_SUCCESS } from '../constants.js'

export const addOrder = async (req, res) => {
	try {
		const data = req.body
		console.log(data)
		const order = await Order.insertMany(data)
		return res.status(200).send({ status: RESPONSE_SUCCESS, data, order })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const getAllOrders = async (req, res) => {
	try {
		const query = req.query
		const orders = await Order.find(query)
		return res.status(200).send({ status: RESPONSE_SUCCESS, data, orders })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const deleteOrder = async (req, res) => {
	try {
		const { _id } = req.query
		const orders = await Order.findByIdAndDelete(_id)
		return res
			.status(200)
			.send({ status: RESPONSE_SUCCESS, data, orders, msg: 'Xoá thành công' })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}
