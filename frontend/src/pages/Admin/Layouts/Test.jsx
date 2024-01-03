import React, { useState } from 'react'
import axios from 'axios'
import useAxios from '~/hooks/useAxios'
import { RESPONSE } from '~/constants/constant'

const Test = () => {
	const [user, setUser] = useState({})
	const [accessToken, setAccessToken] = useState()
	const [refreshToken, setRefreshToken] = useState()
	const axiosConfig = useAxios(axios.create())
	const [images, setImages] = useState([])

	const getAllUsers = () => {
		axiosConfig
			.get('http://locahost:5000/user/getall')
			.then((data) => {
				console.log(data)
			})
			.catch((err) => console.log(err))
	}

	const login = () => {
		axios
			.post(`http://localhost:5000/user/get`, {
				email: 'email@gmail.com',
				password: 'mypassword',
			})
			.then((res) => {
				const data = res.data
				if (data.status === RESPONSE.RESPONSE_SUCCESS) {
					console.log(data)
					setUser(data.user)
					setAccessToken(data.accessToken)
					setRefreshToken(data.refreshToken)
				} else {
					alert(data.msg)
				}
			})
			.catch((err) => console.log('err', err))
	}

	const refreshTokenUser = () => {
		axiosConfig
			.post('http://localhost:5000/user/refresh')
			.then((value) => {
				console.log(value)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handleImage = (images) => {
		const formData = new FormData()
		// const images = e.target.files
		const newFiles = Array.from(images)
		newFiles.forEach((image) => {
			formData.append('file', image)
			formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSET)
		})
		axios
			.post(
				`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
				formData
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
	}

	return (
		<div className='flex flex-col gap-8'>
			<button
				className='py-4 px-8 rounded-lg self-start border border-blue-400 border-solid'
				onClick={getAllUsers}
			>
				Get all users
			</button>
			<button
				className='py-4 px-8 rounded-lg self-start border border-blue-400 border-solid'
				onClick={login}
			>
				Login
			</button>
			<button
				className='py-4 px-8 rounded-lg self-start border border-blue-400 border-solid'
				onClick={refreshTokenUser}
			>
				Refresh Token
			</button>
			<input
				type='file'
				onChange={(e) => {
					setImages(Array.from(e.target.files))
				}}
				multiple
			/>
			<button onClick={() => handleImage(images)}>Up</button>
		</div>
	)
}

export default Test
