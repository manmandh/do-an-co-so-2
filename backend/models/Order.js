import mongoose from 'mongoose'

const schema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
			trim: true,
			ref: 'User',
		},
		productId: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'Product',
		},
		optionId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
	},
	{ timestamps: true }
)

const Order = mongoose.model('Order', schema)

export default Order
