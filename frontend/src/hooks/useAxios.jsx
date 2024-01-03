import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import { UserContext } from '~/context/UserContext'

let axiosConfig = axios.create()

const refreshToken = async () => {
	try {
		console.log('requesting...')
		const res = await axios.post(
			'http://localhost:5000/user/refresh',
			{},
			{
				withCredentials: true,
			}
		)
		console.log('refresh token: ' + res.data)
		return res.data
	} catch (error) {
		console.log('err', error)
	}
}

const useAxios = (axios) => {
	const { user, setUser } = useContext(UserContext)
	axios.interceptors.request.use(
		async (config) => {
			console.log('interceptions')
			let now = new Date()
			console.log(user, 'jwt: ' + user.accessToken)
			const decodedToken = jwtDecode(user.accessToken)
			if (decodedToken.exp < now.getTime() / 100) {
				const data = await refreshToken()
				console.log(data)
				// const refreshUser = {
				// 	...user,
				// 	accessToken: data.accessToken,
				// }
				// config.headers['token'] = `Bearer ${data.accessToken}`
				// setUser(refreshUser)
			}
			return config
		},
		(err) => {
			return Promise.reject(err)
		}
	)
	return axiosConfig
}

export default useAxios
