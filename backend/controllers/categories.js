import { RESPONSE_FAIL, RESPONSE_SUCCESS } from '../constants.js'
import Category from '../models/CategoryModel.js'

export const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find({})
		// console.log(categories)
		res.status(200).send({ status: RESPONSE_SUCCESS, categories })
	} catch (error) {
		console.log(error)
		res.status(500).send({ status: RESPONSE_FAIL, msg: error })
	}
}

export const createCategory = async (req, res) => {
	try {
		const category = req.body
		const newCategory = await Category.create(category)
		console.log(newCategory)
		res.status(200).send({ status: RESPONSE_SUCCESS, newCategory })
	} catch (err) {
		console.log(err)
		res.status(500).send({ status: RESPONSE_FAIL, msg: 'Có lỗi' })
	}
}

export const updateCategory = async (req, res) => {
	try {
		const cateogories = await Category.find({})
		const { name, parentCategory, newName } = req.body
		const categoryFind = cateogories.find(
			(category) => category.name === parentCategory
		)
		categoryFind.children.forEach((category) => {
			if (category.name === name) {
				category.name = newName
				return
			}
		})
		await Category.findByIdAndUpdate({ _id: categoryFind._id }, categoryFind)
		res
			.status(200)
			.send({ status: RESPONSE_SUCCESS, msg: 'Cập nhật thành công' })
	} catch (error) {
		console.log(error)
		res.status(500).send({ status: RESPONSE_FAIL, error })
	}
}

export const addNewCategory = async (req, res) => {
	try {
		const { name, parentName } = req.body
		console.log(name, parentName)
		const categoryFind = await Category.findOne({ name: parentName })
		const newCategory = new Category({ name })
		categoryFind.children.push({
			name,
		})
		categoryFind.save()
		res.status(200).send({
			status: RESPONSE_SUCCESS,
			msg: 'Thêm mới thành công',
			category: newCategory,
		})
	} catch (error) {
		console.log(error)
		res.status(500).send({ status: RESPONSE_FAIL, error })
	}
}

export const deleteCategory = async (req, res) => {
	try {
		const { name, parentName } = req.body
		const categoryFind = await Category.findOne({ name: parentName })
		categoryFind.children = categoryFind.children.filter(
			(category) => category.name !== name
		)
		categoryFind.save()
		res.status(200).send({ status: RESPONSE_SUCCESS, msg: 'Xoá thành công' })
	} catch (error) {
		console.log(error)
		res.status(500).send({ status: RESPONSE_FAIL, error })
	}
}
