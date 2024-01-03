import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	thumb: {
		type: String,
		trim: true,
	},
	product_name: {
		type: String,
		trim: true,
	},
	productId: {
		type: mongoose.Types.ObjectId,
		required: true,
		trim: true,
	},
	quantity: {
		type: Number,
		default: 1,
	},
	product_price: {
		type: Number,
	},
})

const Cart = mongoose.model('Cart', schema)

export default Cart
