import express from 'express'
import { createOptions } from '../controllers/options.js'

const optionRouter = express.Router()

optionRouter.get('/getall')
optionRouter.post('/', createOptions)
optionRouter.put('/')
optionRouter.delete('')

export default optionRouter
