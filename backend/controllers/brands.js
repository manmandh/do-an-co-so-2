import { RESPONSE_FAIL, RESPONSE_SUCCESS } from '../constants.js'
import Brand from '../models/Brand.js'

export const createBrand = async (req, res) => {
	try {
		const { name } = req.body
		const newBrand = await Brand.create({ name })
		res.status(200).send({ status: RESPONSE_SUCCESS, newBrand })
	} catch (error) {
		console.log(error)
		res.status(500).send({ status: RESPONSE_FAIL, error })
	}
}

export const getAllBrands = async (req, res) => {
	try {
		const brands = await Brand.find({})
		res.status(200).send({ status: RESPONSE_SUCCESS, brands })
	} catch (error) {
		console.log(error)
		res.status(500).send({ status: RESPONSE_FAIL, error })
	}
}
