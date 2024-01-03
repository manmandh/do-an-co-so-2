import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import productRouter from './routes/product.js'
import userRouter from './routes/user.js'
import categoryRouter from './routes/category.js'
import brandRouter from './routes/brand.js'
import cartRouter from './routes/cart.js'
import orderRouter from './routes/order.js'

dotenv.config()
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jancj6h.mongodb.net/?retryWrites=true&w=majority`

const app = express()

// connect to mongoose db
mongoose
	.connect(URI)
	.then(() => {
		console.log('connected to mongoose db')
	})
	.catch((err) => {
		console.log(err)
	})

// get port from env
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '30mb' }))
app.use(cookieParser())
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: '30mb',
	})
)
app.use(cors())
app.use(express.json())

// Router
app.get('/', (req, res) => {
	res.send('Mẫn khùng quá trời quá đất')
})

app.use('/products', productRouter)
app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/brand', brandRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

app.listen(PORT, () => {
	console.log(`App listening on port: ${PORT}`)
})
