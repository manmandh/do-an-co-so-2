import React, { useContext, useEffect, useState } from 'react'
import DashboardCardInfo from '../Components/DashboardCardInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faMobileScreenButton,
	faPeopleRoof,
	faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Button } from '@mui/material'
import { DataContext } from '~/context/DataContext'
import axios from 'axios'
import LayerLoading from '../Components/LayerLoading'

ChartJS.register(ArcElement, Tooltip, Legend)
const data = {
	labels: ['Điện thoại', 'Ipad', 'Tivi', 'Máy giặt'],
	datasets: [
		{
			label: 'Number of products',
			data: [93, 20, 51, 15],
			backgroundColor: [
				'rgba(255, 99, 132)',
				'rgba(55, 162, 235)',
				'rgba(255, 206, 86)',
				'rgba(75, 192, 192)',
			],
		},
	],
}

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: true,
			position: 'right',
		},
	},
}

const Dashboard = ({ icon }) => {
	const { database, setDatabase } = useContext(DataContext)
	const [users, setUsers] = useState([])
	const [admins, setAdmins] = useState([])
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		Promise.allSettled([
			axios.get('http://localhost:5000/user/getall'),
			axios.get('http://localhost:5000/products/getall'),
		])
			.then(([userRes, productRes]) => {
				const users = userRes.value.data.users
				const products = productRes.value.data.products
				setDatabase({
					...database,
					users: users,
					products: products,
				})
				const onlyUsers = []
				const onlyAdmins = []
				users.forEach((user) => {
					if (user.isAdmin) onlyAdmins.push(user)
					else onlyUsers.push(user)
				})
				setUsers(onlyUsers)
				setAdmins(onlyAdmins)
				setProducts(products)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return loading ? (
		<LayerLoading scale={'1.4'} />
	) : (
		<div>
			<h1 className='text-5xl flex items-center gap-4'>
				{icon}
				<span className='text-gray'>Dashboard</span>
			</h1>

			<div className='py-[5rem] flex gap-8 overflow-scroll'>
				<DashboardCardInfo
					icon={<FontAwesomeIcon icon={faUsers} />}
					title={'Users'}
					content={`${users.length} ${
						users.length > 1 ? 'accounts' : 'account'
					}`}
					colorIcon={'text-[#FF6651]'}
				/>
				<DashboardCardInfo
					icon={<FontAwesomeIcon icon={faPeopleRoof} />}
					title={'Admins'}
					content={`${admins.length} ${admins.length > 1 ? 'admins' : 'admin'}`}
					colorIcon={'text-[#00aefd]'}
				/>
				<DashboardCardInfo
					icon={<FontAwesomeIcon icon={faMobileScreenButton} />}
					title={'Products'}
					content={`${products.length} ${
						products.length > 1 ? 'products' : 'product'
					}`}
					colorIcon={'text-[#20E3B2]'}
				/>
			</div>
			<div className='flex flex-col items-center lg:flex-row'>
				<div className='flex-1 max-w-[100%] aspect-square lg:max-w-[50%]'>
					<Pie
						data={data}
						options={options}
					/>
				</div>
				<div className='flex-1 text-center'>
					<h2 className='text-5xl mb-4'>Cơ cấu sản phẩm của cửa hàng</h2>
					<p className='mb-4'>Số liệu cực kì chi tiết, gọn gàng, đẹp đẽ</p>
					<p className='mb-4'>Cập nhật thường xuyên</p>
					<Button
						size='large'
						style={{ fontSize: '2rem' }}
						variant='contained'
					>
						Update now
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
