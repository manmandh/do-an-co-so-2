import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button'
import { DataContext } from '~/context/DataContext'
import axios from 'axios'
import { convertToDom, formatMoneyTo } from '~/helper'
import { useNavigate } from 'react-router-dom'
import {
	productManageInitial,
	productManageReducer,
	productManageActions,
} from '~/reducer/productManageReducer'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-hot-toast'

const columns = [
	{ field: 'actions', headerName: 'Thao tác', width: 200 },
	{ field: 'name', headerName: 'Tên sản phẩm', width: 500 },
	{
		field: 'category_name',
		headerName: 'Loại sản phẩm',
		width: 200,
	},
	{ field: 'brand', headerName: 'Hãng', width: 200 },
]

const ManageProducts = ({ icon }) => {
	const [imageUpload, setImageUpload] = useState({
		images: [],
		src: [],
	})
	const [rowsData, setRowsData] = useState([])
	const [product, dispatch] = useReducer(
		productManageReducer,
		productManageInitial
	)
	const { database, setDatabase } = useContext(DataContext)
	const [category, setCategory] = useState('')
	const [rows, setRows] = useState([])
	const [isLoading, setIsLoading] = useState({
		uploading: false,
	})
	const navigate = useNavigate()

	const handlePreviewImage = (e) => {
		const files = e.target.files
		const filesArray = Array.from(files)
		const srcFiles = filesArray.map((file) => URL.createObjectURL(file))
		setImageUpload({
			images: [...imageUpload.images, ...filesArray],
			src: [...imageUpload.src, ...srcFiles],
		})
	}
	const handleRemoveImage = (index) => {
		const newSrc = [...imageUpload.src]
		const updatedSrc = [...newSrc.slice(0, index), ...newSrc.slice(index + 1)]
		const newImage = imageUpload.images
		const fileArray = Array.from(newImage).filter((image, i) => index !== i)
		setImageUpload({
			images: fileArray,
			src: updatedSrc,
		})
	}
	const changeListBrand = (category) => {
		const categoryFound = database.categories.find(
			(cate) => cate.name === category
		)
		setCategory(categoryFound.children)
	}
	const postProduct = async (data) => {
		await axios
			.post('http://localhost:5000/products', data)
			.then((res) => {
				console.log(res.data)
				setRowsData(() => [
					...rowsData,
					{
						id: res.data.product._id ?? Math.random(),
						name: product.name,
						category: product.category,
						brand: product.brand,
					},
				])
			})
			.catch((err) => console.log(err))
	}
	const uploadImages = async () => {
		setIsLoading({ ...isLoading, uploading: true })
		const images = []
		const formData = new FormData()
		imageUpload.images.forEach(async (image, index) => {
			formData.append('file', image)
			formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSET)
			await axios
				.post(
					`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
					formData
				)
				.then((res) => {
					images.push({
						publicId: res.data.public_id,
						url: res.data.secure_url,
					})
				})
				.catch((err) => console.log(err))
			if (index === imageUpload.images.length - 1) {
				const newProduct = {
					name: product.name,
					category_name: product.category,
					brand: product.brand,
					specifications: rows,
					details: convertToDom(product.desc),
					img: images,
				}
				toast.success('Thêm thành công')
				postProduct(newProduct)
				dispatch({
					type: productManageActions.CLEAR_DATA,
				})
				setImageUpload({
					images: [],
					src: [],
				})
				setCategory('')
				setRows([])
				setIsLoading({ ...isLoading, uploading: false })
			}
		})
	}

	const handleAddProduct = async () => {
		imageUpload.images && (await uploadImages())
	}
	useEffect(() => {
		setRowsData(
			database.products.map((product) => {
				return {
					id: product._id,
					...product,
				}
			})
		)
		const getBrands = async () => {
			await axios
				.get('http://localhost:5000/brand/getall')
				.then((allBrands) => {
					setDatabase((prev) => {
						return {
							...prev,
							brands: allBrands.data.brands,
						}
					})
				})
				.catch((err) => {
					console.log(err)
				})
		}
		const getCategories = async () => {
			await axios
				.get('http://localhost:5000/category/getall')
				.then((allCategory) => {
					setDatabase((prev) => {
						return {
							...prev,
							categories: allCategory.data.categories,
						}
					})
				})
				.catch((err) => {
					console.log(err)
				})
		}
		!database.brands && getBrands()
		!database.categories && getCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleDeleteRow = () => {
		if (!rows.length) {
			return
		}
		setRows((prevRows) => {
			prevRows.pop()
			return [...prevRows]
		})
	}

	const handleAddRow = () => {
		setRows((prevRows) => [
			...prevRows,
			{
				specName: '',
				specValue: '',
			},
		])
	}

	const handleChangeSpecName = (e, index) => {
		setRows((row) => {
			const newRow = [...row]
			newRow[index].specName = e.target.value
			return newRow
		})
	}

	const handleChangeSpecValue = (e, index) => {
		setRows((row) => {
			const newRow = [...row]
			newRow[index].specValue = e.target.value
			return newRow
		})
	}
	return (
		<div>
			<h3 className='text-5xl flex items-center gap-4'>
				{icon}
				<span className='text-gray'>Quản lí sản phẩm</span>
			</h3>
			<div className='py-[5rem]'>
				<h3 className='font-bold'>Danh sách sản phẩm</h3>
				<div className='h-[40rem] w-full mt-[5rem]'>
					<ThemeProvider theme={createTheme({ typography: { fontSize: 25 } })}>
						<DataGrid
							rows={rowsData}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 20 },
								},
							}}
							processRowUpdate={(newRow, oldRow) => console.log(newRow)}
							pageSizeOptions={[5, 10, 15, 20, 25, 30]}
							style={{ fontSize: '1.6rem' }}
							onRowClick={(e) => navigate(`products/${e.row.id}`)}
						/>
					</ThemeProvider>
				</div>
			</div>
			<div className='flex flex-col gap-6 text-[1.6rem]'>
				<h3 className='text-3xl pb-[3rem] font-bold'>Thêm mới sản phẩm:</h3>
				<div className='flex flex-col gap-4'>
					<label htmlFor=''>Tên sản phẩm</label>
					<input
						type='text'
						placeholder='Nhập tên sản phẩm'
						value={product.name}
						onChange={(e) =>
							dispatch({
								type: productManageActions.CHANGE_NAME,
								payload: e.target.value,
							})
						}
					/>
				</div>
				<div className='flex flex-col gap-4'>
					<label htmlFor='cate'>Loại danh mục</label>
					<select
						className='outline-none p-4 bg-transparent cursor-pointer border border-[#ccc] rounded-lg'
						value={product.category}
						onChange={(e) => {
							dispatch({
								type: productManageActions.CHANGE_CATEGORY,
								payload: e.target.value,
							})
							changeListBrand(e.target.value)
						}}
						id='cate'
					>
						<option value=''>None</option>
						{database.categories &&
							database.categories.map((item, index) => (
								<option
									key={index}
									value={item.name}
								>
									{item.name}
								</option>
							))}
					</select>
				</div>
				<div className='flex flex-col gap-4'>
					<label htmlFor='brands'>Hãng</label>
					<select
						className='p-4 cursor-pointer outline-none bg-transparent border border-[#ccc] rounded-lg'
						value={product.brand}
						onChange={(e) =>
							dispatch({
								type: productManageActions.CHANGE_BRAND,
								payload: e.target.value,
							})
						}
						id='brands'
					>
						<option value=''>None</option>
						{category &&
							category.map((item, index) => (
								<option
									key={index}
									value={item.name}
								>
									{item.name}
								</option>
							))}
					</select>
				</div>
				<div className='flex flex-col gap-4'>
					<label htmlFor='image-upload'>Hình ảnh liên quan đến sản phẩm</label>
					<div className='flex items-center gap-4 overflow-scroll'>
						{imageUpload.src.map((image, index) => (
							<figure
								className='relative flex-shrink-0'
								key={index}
							>
								<img
									src={image}
									alt='hình ảnh sản phẩm'
									className='w-[10rem] h-[10rem] object-cover'
								/>
								<FontAwesomeIcon
									icon={faXmark}
									className='absolute top-0 right-0 text-[#ccc] p-2 cursor-pointer hover:bg-[#ccc5]'
									onClick={() => handleRemoveImage(index)}
								/>
							</figure>
						))}
					</div>
					<label
						htmlFor='image-upload'
						className='border border-[#ccc] border-solid self-start px-6 py-4 rounded-lg cursor-pointer'
					>
						Tải ảnh lên
					</label>
					<input
						type='file'
						id='image-upload'
						hidden
						multiple
						onChange={(e) => handlePreviewImage(e)}
					/>
				</div>
				<div className='w-full flex flex-col gap-4 h-auto'>
					<h3>Thông số sản phẩm</h3>
					<div>
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

						<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
							<table className='w-full text-sm text-left text-gray-500 text-gray-400'>
								<thead className=''>
									<tr>
										<th
											scope='col'
											className='px-6 py-3'
										>
											Thông số
										</th>
										<th
											scope='col'
											className='px-6 py-3'
										>
											Chi tiết
										</th>
									</tr>
								</thead>
								<tbody>
									{rows.map((row, index) => (
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
													value={row.specName}
													className='w-full border-none'
													onChange={(e) => handleChangeSpecName(e, index)}
												/>
											</th>
											<td className='px-6 py-4'>
												<input
													type='text'
													value={row.specValue}
													className='w-full border-none'
													onChange={(e) => {
														handleChangeSpecValue(e, index)
													}}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className='self-end'>
					<Button
						size='large'
						style={{ fontSize: '1.6rem' }}
					>
						Lưu
					</Button>
				</div>
				<div className='flex flex-col gap-4'>
					<label htmlFor=''>Mô tả</label>
					<textarea
						className='w-full border border-[#ccc] border-solid rounded-lg text-[1.6rem] p-4 h-[20rem] bg-transparent resize-none'
						placeholder='Điền mô tả'
						value={product.desc}
						onChange={(e) =>
							dispatch({
								type: productManageActions.CHANGE_DESCRIPTIONS,
								payload: e.target.value,
							})
						}
						spellCheck={false}
					></textarea>
					<div className='self-end'>
						{isLoading.uploading ? (
							<LoadingButton
								loading
								size='large'
							>
								Loading
							</LoadingButton>
						) : (
							<Button
								size='large'
								style={{ fontSize: '1.6rem' }}
								onClick={handleAddProduct}
							>
								Thêm
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ManageProducts

// <div
// 	dangerouslySetInnerHTML={{ __html: convertToDom(product.desc) }}
// ></div>
