import { RESPONSE_FAIL, RESPONSE_SUCCESS } from '../constants.js'
import Cart from '../models/Cart.js'

export const addNewCart = async (req, res) => {
	try {
		const data = req.body
		const newCart = await Cart.create(data)
		return res.status(200).send({ status: RESPONSE_SUCCESS, newCart })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const getAllCarts = async (req, res) => {
	try {
		const query = req.query
		const carts = await Cart.find(query)
		return res
			.status(200)
			.send({ status: RESPONSE_SUCCESS, msg: 'Thành công', carts })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const deleteCart = async (req, res) => {
	try {
		const { _id } = req.query
		const cart = await Cart.findByIdAndDelete(_id)
		return res
			.status(200)
			.send({ status: RESPONSE_SUCCESS, msg: 'Xoá thành công', cart })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const deleteMultipleCart = async (req, res) => {
	try {
		const { ids } = req.query
		const results = await Cart.deleteMany({ _id: { $in: ids } })
		return res
			.status(200)
			.send({ status: RESPONSE_SUCCESS, msg: 'Xoá thành công', results })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const updateCart = async (req, res) => {
	try {
		const query = req.query
		const data = req.body
		console.log(query)
		const carts = await Cart.find(query)
		return res
			.status(200)
			.send({ status: RESPONSE_SUCCESS, msg: 'Thành công', carts })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}
