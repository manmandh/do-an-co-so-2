import Product from '../models/ProductModel.js'
import { RESPONSE_FAIL, RESPONSE_SUCCESS } from '../constants.js'

export const getAllProduct = async (req, res) => {
	try {
		const query = req.query
		const products = await Product.find(query ?? {})
		return res.status(200).send({ status: RESPONSE_SUCCESS, products })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const getLimitRecords = async (req, res) => {
	try {
		const { limit } = req.params
		const { query } = req.query
		const products = await Product.find(query ?? {}).limit(limit)
		return res.status(200).send({ status: RESPONSE_SUCCESS, products })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const getProductById = async (req, res) => {
	try {
		const { id } = req.params
		const product = await Product.findById(id)
		return res.status(200).send({ status: RESPONSE_SUCCESS, product })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const getProductByName = async (req, res) => {
	try {
		console.log(req.params)
		return res.status(200).send({ status: RESPONSE_SUCCESS, msg: req.params })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const addProduct = async (req, res) => {
	try {
		const data = req.body
		const product = await Product.create(data)
		console.log(product)
		return res
			.status(200)
			.send({ status: RESPONSE_SUCCESS, msg: req.files, product })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const deleteProduct = async (req, res) => {
	try {
		const data = req.body
		return res
			.status(200)
			.send({ status: RESPONSE_SUCCESS, data, msg: 'Xoá sản phẩm thành công' })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_SUCCESS, msg: error })
	}
}

export const updateProduct = async (req, res) => {
	try {
		const { id, ...data } = req.body
		const product = await Product.findById(id)
		const keys = Object.keys(data)
		keys.forEach((key) => {
			product[key] = data[key]
		})
		product.save()
		return res.status(200).send({
			status: RESPONSE_SUCCESS,
			product,
			msg: 'Cập nhật sản phẩm thành công',
		})
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_SUCCESS, msg: error })
	}
}

export const addOption = async (req, res) => {
	try {
		const { id, ...data } = req.body
		const productFound = await Product.findById(id)
		productFound.products.push(data)
		await productFound.save()
		return res.status(200).send({
			status: RESPONSE_SUCCESS,
			product: productFound,
			msg: 'Thêm thành công',
		})
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_SUCCESS, msg: error })
	}
}

export const searchProduct = async (req, res) => {
	try {
		const { search } = req.query
		const products = await Product.find({
			name: { $regex: search, $options: 'i' },
		})
		return res.status(200).send({ status: RESPONSE_SUCCESS, products })
	} catch (error) {
		console.log(error)
		return res.status(500).send({ status: RESPONSE_SUCCESS, msg: error })
	}
}
