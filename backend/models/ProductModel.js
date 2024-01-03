import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
	thumb: {
		publicId: String,
		url: String,
	},
	price: Number,
	quantity: {
		type: Number,
		default: 0,
	},
	sold: {
		type: Number,
		default: 0,
	},
	options: [
		{
			optionName: String,
			optionValue: String,
		},
	],
})

const specificationSchema = new mongoose.Schema({
	specName: {
		type: String,
	},
	specValue: {
		type: String,
	},
})

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category_name: {
		type: String,
		required: true,
	},
	img: [
		{
			publicId: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	label: {
		type: String,
		required: false,
		default: 'Sản phẩm mới',
	},
	brand: {
		type: String,
		default: '',
	},
	details: {
		type: String,
		required: false,
	},
	specifications: {
		type: [specificationSchema],
	},
	products: [{ type: productSchema, default: {} }],
	sale: {
		percent: {
			type: Number,
			default: 0,
		},
		duration: {
			type: String,
			default: '',
		},
	},
})
const Product = mongoose.model('Product', schema)
export default Product
