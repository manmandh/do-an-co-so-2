import mongoose from 'mongoose'

const schema = mongoose.Schema({
	tokens: {
		type: Array,
		default: [],
	},
})

const Token = mongoose.model('Token', schema)

export default Token
