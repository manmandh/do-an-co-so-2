import express from 'express'
import {
	getUser,
	postUser,
	getAllUsers,
	requestRefreshToken,
	updateUser,
} from '../controllers/user.js'
import { verifyToken } from '../middleware/middleware.js'

const userRouter = express.Router()

userRouter.post('/get', getUser)
// userRouter.get('/getall', verifyToken, getAllUsers)
userRouter.get('/getall', getAllUsers)
userRouter.post('/', postUser)
userRouter.post('/refresh', requestRefreshToken)
userRouter.put('/', updateUser)

export default userRouter
