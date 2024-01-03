import React, { useContext, useEffect, useState, useTransition } from 'react'
import { DataContext } from '~/context/DataContext'
import LayerLoading from '../Components/LayerLoading'
import { Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const filterOptions = {
	ID: 'key',
	Tên: 'name',
	Loại: 'category_name',
	Hãng: 'brand',
	'Chi tiết': 'optionDetails',
}

const Store = ({ icon }) => {
	const { database } = useContext(DataContext)
	const [loading, setLoading] = useState({
		rendering: false,
		updating: false,
		checking: false,
	})
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [changed, setChanged] = useState(false)
	const [productSelected, setProductSelected] = useState(null)
	const [rootProducts, setRootProducts] = useState([])
	const [filterOption, setFilterOption] = useState('key')
	const [isPending, startTransition] = useTransition()

	const handleChangeQuantity = (e, key) => {
		const { value } = e.target
		const newProducts = JSON.parse(JSON.stringify(products))
		const productFound = newProducts.findIndex((pr) => pr.key === key)
		newProducts[productFound].quantity = +value
		filteredProducts[productFound].quantity = +value
		setProducts(newProducts)
		setFilteredProducts(filteredProducts)
		const changed = rootProducts.some(
			(item, index) => item.quantity !== newProducts[index].quantity
		)
		setChanged(changed)
	}
	const filterProduct = (e) => {
		const { value } = e.target
		startTransition(() => {
			// for (let i = 0; i < 2000000000; i++) {}
			const newFilterdProducts = [...products].filter((pro) =>
				pro[filterOption].toLowerCase().includes(value.toLowerCase())
			)
			setFilteredProducts(newFilterdProducts)
		})
	}

	const handleUpdateStore = () => {
		setLoading({ ...loading, updating: true })
		const data = {
			id: products[0]._id,
			products: products.map((pro) => ({
				_id: pro.key,
				thumb: pro.thumb,
				price: pro.price,
				sold: pro.sold,
				options: pro.options,
				quantity: pro.quantity,
			})),
		}
		axios
			.post('http://localhost:5000/products/update', data)
			.then((res) => {
				setChanged(false)
				setRootProducts(JSON.parse(JSON.stringify(products)))
				toast.success(res.msg && res.msg)
			})
			.catch((err) => toast.error(err))
			.finally(() => {
				setLoading({ ...loading, updating: true })
			})
	}

	useEffect(() => {
		setLoading((prev) => ({ ...prev, rendering: true }))
		const products = []
		database.products.forEach((item) => {
			item.products.forEach((product) => {
				const optionDetails = product.options
					.map((option, index) => {
						if (index === product.options.length - 1) {
							return `${option.optionName}: ${option.optionValue}`
						}
						return `${option.optionName}: ${option.optionValue}, `
					})
					.join(' ')
				products.push({
					...item,
					options: product.options,
					thumb: product.thumb,
					price: product.price,
					quantity: product.quantity,
					sold: product.sold,
					key: product._id,
					optionDetails,
				})
			})
		})
		setProducts(JSON.parse(JSON.stringify(products)))
		setRootProducts(JSON.parse(JSON.stringify(products)))
		setFilteredProducts(JSON.parse(JSON.stringify(products)))
		setLoading((prev) => ({ ...prev, rendering: false }))
	}, [])

	return (
		<div>
			<h3 className='flex items-center text-5xl gap-4'>
				{icon}
				<span className='text-gray'>Kho sản phẩm</span>
			</h3>
			<div className='my-[5rem]'>
				<h3 className='mb-8'>Tìm sản phẩm:</h3>
				<div className='flex items-center gap-8'>
					<select
						className='outline-none py-4 px-6 rounded-md cursor-pointer text-sm'
						onChange={(e) => setFilterOption(e.target.value)}
					>
						{Object.keys(filterOptions).map((key, index) => (
							<option
								value={filterOptions[key]}
								key={index}
							>
								{key}
							</option>
						))}
					</select>
					<input
						type='text'
						placeholder='Tìm kiếm...'
						onChange={filterProduct}
					/>
					<Button
						variant='contained'
						style={{ fontSize: '1.6rem', height: '100%' }}
					>
						Tìm
					</Button>
				</div>
			</div>
			<h1 className='my-[5rem]'>Danh sách hàng trong kho</h1>
			<div className='h-[40rem] w-full mt-[5rem] overflow-auto rounded-xl shadow-lg'>
				{loading.rendering ? (
					<LayerLoading />
				) : (
					<table className='w-full text-sm text-left text-gray-500 text-gray-400 overflow-scroll'>
						<thead className='whitespace-nowrap'>
							<tr>
								<th className='px-6 py-3 w-[20rem]'>ID</th>
								<th className='px-6 py-3 w-[20rem]'>Tên sản phẩm</th>
								<th className='px-6 py-3 w-[15rem]'>Loại sản phẩm</th>
								<th className='px-6 py-3 w-[15rem]'>Hãng</th>
								<th className='px-6 py-3 w-[15rem]'>Chi tiết</th>
								<th className='px-6 py-3 w-[12rem]'>Số lượng</th>
								<th className='px-6 py-3 w-[12rem]'>Đã bán</th>
								<th className='px-6 py-3 w-80'>Còn trong kho</th>
							</tr>
						</thead>
						<tbody className=''>
							{isPending ? (
								<tr>
									<td>Loading...</td>
								</tr>
							) : (
								filteredProducts.map((product) => (
									<tr
										className={`bg-slate-100 border-b cursor-pointer even:bg-white ${
											productSelected &&
											productSelected.key === product.key &&
											'bg-slate-300 even:bg-[#ddd]'
										}`}
										key={product.key}
										onClick={() => setProductSelected(product)}
									>
										<td className='px-6 py-4'>{product.key}</td>
										<td className='px-6 py-4'>{product.name}</td>
										<td className='px-6 py-4'>{product.category_name}</td>
										<td className='px-6 py-4'>{product.brand}</td>
										<td className='px-6 py-4'>{product.optionDetails}</td>
										<td className='px-6 py-4'>
											<input
												type='number'
												defaultValue={product.quantity}
												className='w-[10rem] outline-none border-none bg-transparent'
												onChange={(e) => handleChangeQuantity(e, product.key)}
											/>
										</td>
										<td className='px-6 py-4'>{product.sold}</td>
										<td className='px-6 py-4'>
											{product.quantity - product.sold}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				)}
			</div>
			<div className='mt-8 flex gap-4 justify-end'>
				<Button
					variant='contained'
					style={{ fontSize: '1.6rem' }}
					color='warning'
					disabled={!productSelected}
					onClick={() => setProductSelected(null)}
				>
					Huỷ
				</Button>
				<Button
					variant='contained'
					style={{ fontSize: '1.6rem' }}
					color='error'
					disabled={!productSelected}
					onClick={() => setProductSelected(null)}
				>
					Xoá sản phẩm
				</Button>
				<Button
					variant='contained'
					style={{ fontSize: '1.6rem' }}
					color='success'
					disabled={!changed}
					onClick={handleUpdateStore}
				>
					Cập nhật kho hàng
				</Button>
			</div>
		</div>
	)
}

export default Store
