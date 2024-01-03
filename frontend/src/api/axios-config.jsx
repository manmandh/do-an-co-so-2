import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import { UserContext } from '~/context/UserContext'

let axiosConfig = axios.create()

const refreshToken = async () => {
	try {
		const res = await axios.post('http://localhost:5000/user/refresh', {
			withCrendentials: true,
		})
		return res.data
	} catch (error) {
		console.log(error)
	}
}

axiosConfig.interceptors.request.use(
	async (config) => {
		const { user, setUser } = useContext(UserContext)
		let now = new Date()
		const decodedToken = jwtDecode()
		if (decodedToken.exp < now.getTime() / 100) {
			const data = await refreshToken()
			const refreshUser = {
				...user,
				accessToken: data.accessToken,
			}
			config.headers['token'] = `Bearer ${data.accessToken}`
			setUser(refreshUser)
		}
		return config
	},
	(err) => {
		return Promise.reject(err)
	}
)

export default axiosConfig
