import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import * as Status from '../constants.js'

dotenv.config()

export const verifyToken = (req, res, next) => {
	const token = req.headers.token
	console.log('cookies', req.cookies)
	if (token) {
		const accessToken = token.split(' ')[1]
		Jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, data) => {
			if (err) {
				Jwt.verify(
					res.cookie.refreshToken,
					process.env.REFRESH_TOKEN_KEY,
					(err, data) => {}
				)
				console.log(err)
				return res.status(200).send({
					status: Status.RESPONSE_FAIL,
					msg: 'You are not authencated',
				})
			}
			req.user = data
			req.accessToken = accessToken
			next()
		})
	} else
		return res
			.status(200)
			.send({ status: Status.RESPONSE_FAIL, msg: 'Not have token' })
}
