import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	productId: {
		type: mongoose.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	thumb: {
		type: String,
		required: true,
	},
	options: [
		{
			name: {
				type: String,
				required: true,
			},
			value: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			quantity: {
				type: Number,
				default: 0,
			},
		},
	],
	quantity: {
		type: Number,
		default: 0,
	},
	sold: {
		type: Number,
		default: 0,
	},
})

const ProductDetails = mongoose.model('ProductDetails', schema)

export default ProductDetails
