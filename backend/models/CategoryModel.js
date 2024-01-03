import mongoose from 'mongoose'

const childrenCategory = new mongoose.Schema({
	name: String,
	children: [],
})

const schema = new mongoose.Schema({
	name: String,
	children: [childrenCategory],
})

const Category = mongoose.model('Category', schema)

export default Category
