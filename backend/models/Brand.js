import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	name: String,
})

const Brand = mongoose.model('Brand', schema)

export default Brand
