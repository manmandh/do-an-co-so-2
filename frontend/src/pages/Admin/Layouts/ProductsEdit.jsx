import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material'
import productEditReducer, {
	productEditActions,
	productEditInitital,
} from '~/reducer/productEditReducer'
import { DataContext } from '~/context/DataContext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-hot-toast'

const ProductsEdit = () => {
	const navigate = useNavigate()
	const [product, dispatch] = useReducer(
		productEditReducer,
		productEditInitital
	)
	const productId = useParams().product_id
	const [rows, setRows] = useState([])
	const { database, setDatabase } = useContext(DataContext)
	const [image, setImage] = useState(null)
	const [currentProduct, setCurrentProduct] = useState()
	const [optionProduct, setOptionProduct] = useState({
		quantity: 0,
		price: 0,
	})
	const [loading, setLoading] = useState({
		uploadImage: false,
		render: false,
		updateProduct: false,
	})
	const [categories, setCategories] = useState([])

	const onNameChange = (e) => {
		dispatch({
			type: productEditActions.CHANGE_NAME,
			payload: e.target.value,
		})
	}

	const onCategoryChange = (e) => {
		dispatch({
			type: productEditActions.CHANGE_CATEGORY,
			payload: e.target.value,
		})
		const categoryFound = database.categories.find(
			(category) => category.name === e.target.value
		)
		setCategories(categoryFound)
	}

	const onBrandChange = (e) => {
		dispatch({
			type: productEditActions.CHANGE_BRAND,
			payload: e.target.value,
		})
	}

	const handleAddRow = () => {
		setRows((prevRows) => [
			...prevRows,
			{
				optionName: '',
				optionValue: '',
			},
		])
	}

	const handleChangeOptionName = (e, index) => {
		setRows((row) => {
			const newRow = [...row]
			newRow[index].optionName = e.target.value
			return newRow
		})
	}

	const handleChangeOptionValue = (e, index) => {
		setRows((row) => {
			const newRow = [...row]
			newRow[index].optionValue = e.target.value
			return newRow
		})
	}

	const handleUpdateProduct = async () => {
		setLoading({ ...loading, updateProduct: true })
		const newProduct = {
			id: productId,
			name: product.nameEdit,
			category_name: product.category,
			brand: product.brand,
		}
		try {
			const response = await axios.post(
				'http://localhost:5000/products/update',
				newProduct
			)
			console.log(response.data)
		} catch (error) {
			console.log(error)
		}
		setLoading({ ...loading, updateProduct: false })
	}

	useEffect(() => {
		setLoading({ ...loading, uploadImage: true })
		Promise.allSettled([
			axios.get('http://localhost:5000/category/getall'),
			axios.get('http://localhost:5000/brand/getall'),
			axios.get(`http://localhost:5000/products/id/${productId}`),
		]).then(([categoryRes, brandRes, productRes]) => {
			const categories = categoryRes.value.data.categories
			const brands = brandRes.value.data.brands
			const product = productRes.value.data.product
			setCategories(
				categories.find((category) => category.name === product.category_name)
			)
			setDatabase({
				...database,
				categories,
				brands,
			})
			setCurrentProduct(product)
			dispatch({
				type: productEditActions.CHANGE_NAME,
				payload: product.name,
			})
			dispatch({
				type: productEditActions.CHANGE_CATEGORY,
				payload: product.category_name,
			})
			dispatch({
				type: productEditActions.CHANGE_BRAND,
				payload: product.brand,
			})
			setLoading(false)
		})
		setLoading({ ...loading, uploadImage: false })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productId])

	const handleDeleteRow = () => {
		if (!rows.length) {
			return
		}
		setRows((prevRows) => {
			prevRows.pop()
			return [...prevRows]
		})
	}

	const uploadImage = async (image) => {
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSET)
		try {
			const res = await axios.post(
				`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
				formData
			)
			return res
		} catch (error) {
			console.log(error)
		}
		return null
	}

	const postOptionProduct = async (product) => {
		try {
			const productRes = await axios.post(
				'http://localhost:5000/products/option',
				product
			)
			return productRes
		} catch (error) {
			console.log(error)
		}
		return null
	}

	const handleAddOptions = async () => {
		if (!image) return
		setLoading(true)
		const imageRes = await uploadImage(image)
		const product = {
			id: productId,
			thumb: {
				publicId: imageRes.data.public_id,
				url: imageRes.data.secure_url,
			},
			quantity: +optionProduct.quantity,
			price: +optionProduct.price,
			options: rows.map((row) => {
				return {
					optionName: row.optionName,
					optionValue: row.optionValue,
				}
			}),
		}
		const productRes = await postOptionProduct(product)
		console.log(productRes)
		toast.success('Thêm thành công')
		setImage(null)
		setOptionProduct({ quantity: 0, price: 0 })
		setRows([])
		setLoading(false)
	}

	return (
		<div>
			<header className='flex justify-between items-center'>
				<h1 className='text-5xl text-gray'>Chi tiết sản phẩm</h1>
				<span onClick={() => navigate(-1)}>
					<ArrowBackIcon
						style={{ fontSize: '3rem' }}
						className='text-7xl cursor-pointer hover:text-pri'
					/>
				</span>
			</header>
			<div className='mt-[5rem] flex flex-col gap-8'>
				<div className='flex items-center gap-6'>
					<label htmlFor='name'>Tên sản phẩm:</label>
					<input
						type='text'
						placeholder='Nhap ten san pham'
						value={product.nameEdit}
						className='flex-1'
						id='name'
						onChange={onNameChange}
					/>
				</div>
				<div className='flex items-center gap-6'>
					<label htmlFor='category'>Loại:</label>
					<select
						id='category'
						className='outline-none bg-transparent border border-[#ccc] rounded-lg px-4 py-2 text-sm cursor-pointer'
						onChange={onCategoryChange}
						value={product.category}
					>
						<option value=''>None</option>
						{database?.categories?.map((category) => (
							<option
								value={category.name}
								key={category._id}
							>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div className='flex items-center gap-6'>
					<label htmlFor='brand'>Hãng:</label>
					<select
						id='brand'
						className='outline-none bg-transparent border border-[#ccc] rounded-lg px-4 py-2 text-sm cursor-pointer'
						value={product.brand}
						onChange={onBrandChange}
					>
						<option value=''>None</option>
						{categories?.children?.map((category, index) => (
							<option
								value={category.name}
								key={index}
							>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<Button
					variant='contained'
					style={{ fontSize: '1.6rem' }}
					onClick={handleUpdateProduct}
				>
					Cập nhật
				</Button>
			</div>
			<h2 className='mt-[5rem] text-5xl text-gray'>Thêm lựa chọn</h2>
			<div className='flex gap-8 mt-[5rem] w-full'>
				<div className='flex flex-col gap-8 flex-[2]'>
					<label htmlFor='quantity'>Số lượng</label>
					<input
						type='text'
						placeholder='Thêm số lượng'
						id='quantity'
						value={optionProduct.quantity}
						onChange={(e) =>
							setOptionProduct({
								...optionProduct,
								quantity: e.target.value,
							})
						}
					/>
					<label htmlFor='price'>Giá:</label>
					<input
						type='text'
						placeholder='Thêm số lượng'
						id='price'
						value={optionProduct.price}
						onChange={(e) =>
							setOptionProduct({
								...optionProduct,
								price: e.target.value,
							})
						}
					/>
					<h2>Thông tin thêm: </h2>
					<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
						<div>
							<Button
								style={{ fontSize: '1.6rem' }}
								onClick={handleAddRow}
							>
								Add row
							</Button>
							<Button
								style={{ fontSize: '1.6rem' }}
								onClick={handleDeleteRow}
							>
								Delete row
							</Button>
						</div>
						<table className='w-full text-sm text-left text-gray-500 text-gray-400'>
							<thead className=''>
								<tr>
									<th
										scope='col'
										className='px-6 py-3'
									>
										Tên:
									</th>
									<th
										scope='col'
										className='px-6 py-3'
									>
										Chi tiết:
									</th>
								</tr>
							</thead>
							<tbody>
								{rows?.map((row, index) => (
									<tr
										className='bg-slate-300 border-b cursor-pointer even:bg-white'
										key={index}
									>
										<th
											scope='row'
											className='px-6 py-4 font-medium text-gray-900 hover:bg-red'
										>
											<input
												type='text'
												value={row.optionName}
												className='w-full border-none'
												onChange={(e) => handleChangeOptionName(e, index)}
											/>
										</th>
										<td className='px-6 py-4'>
											<input
												type='text'
												value={row.optionValue}
												className='w-full border-none'
												onChange={(e) => handleChangeOptionValue(e, index)}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className='flex-1 flex flex-col gap-8'>
					<span>Thêm hình ảnh sản phẩm:</span>
					<label
						htmlFor='image-upload'
						className='py-4 px-6 bg-blue-500 self-start text-white rounded-lg cursor-pointer'
					>
						Chọn ảnh
					</label>
					<input
						type='file'
						id='image-upload'
						hidden
						onChange={(e) => setImage(e.target.files[0])}
					/>
					<figure className='aspect-2/3 border border-dashed rounded-2xl bg-white'>
						{!image ? (
							<div className='flex items-center justify-center text-8xl w-full h-full'>
								<FontAwesomeIcon icon={faCameraRetro} />
							</div>
						) : (
							<img
								src={URL.createObjectURL(image)}
								alt='product'
								className='w-full h-full object-contain'
							></img>
						)}
					</figure>
				</div>
			</div>
			{loading ? (
				<LoadingButton
					variant='contained'
					loading
					style={{ width: '100%', marginTop: '2rem', padding: '1.5rem' }}
				>
					Loading
				</LoadingButton>
			) : (
				<Button
					variant='contained'
					onClick={handleAddOptions}
					style={{ width: '100%', fontSize: '1.6rem', marginTop: '2rem' }}
				>
					Thêm
				</Button>
			)}
		</div>
	)
}

export default ProductsEdit
