import mongoose from 'mongoose'

const schema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		default: '',
	},
	phone: {
		type: String,
		default: '',
	},
	sex: {
		type: String,
		default: '',
	},
	date: {
		type: String,
		default: '',
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
})

const User = mongoose.model('User', schema)

export default User
