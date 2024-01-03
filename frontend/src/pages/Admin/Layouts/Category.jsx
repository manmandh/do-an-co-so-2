import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	ThemeProvider,
	createTheme,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Button/Button'
import axios from 'axios'
import { DataContext } from '~/context/DataContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenFancy, faTrash } from '@fortawesome/free-solid-svg-icons'

const Category = ({ icon }) => {
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState('')
	const [parentCategory, setParenCategory] = useState(null)
	const { database, setDatabase } = useContext(DataContext)
	const [categoryEdit, setCategoryEdit] = useState({})

	const handleAddCategory = () => {
		setCategories((prev) => {
			const newCategories = [...prev]

			const data = { name: category, parentName: parentCategory }
			axios
				.post('http://localhost:5000/category/add', data)
				.then((res) => {
					console.log(res.data)
					newCategories.forEach((item) => {
						if (item.name === parentCategory) {
							item.children.push({
								_id: res.data.category._id,
								name: category,
								children: [],
							})
						}
					})
				})
				.catch((err) => {
					console.log(err)
				})
			console.log(newCategories)
			return newCategories
		})
		console.log(parentCategory)
	}

	const handleEditCategory = () => {
		const data = {
			name: categoryEdit.oldName,
			parentCategory: categoryEdit?.parentName,
			newName: categoryEdit?.currentName,
		}
		axios
			.patch('http://localhost:5000/category', data)
			.then((res) => {
				console.log(res.msg)
			})
			.catch((err) => {
				console.log(err)
			})
		console.log(data)
	}

	const handleDeleteCategory = (name, parentName) => {
		const data = { name, parentName }
		axios
			.post('http://localhost:5000/category/delete', data)
			.then((res) => {
				console.log(res.data.msg)
			})
			.catch((err) => {
				console.log(err)
			})
		setCategories((prev) => {
			const newCategories = [...prev]
			newCategories.forEach((category) => {
				if (category.name === parentName) {
					category.children = category.children.filter(
						(item) => item.name !== name
					)
					return
				}
			})
			return newCategories
		})
	}

	useEffect(() => {
		axios
			.get('http://localhost:5000/category/getall')
			.then((categories) => {
				setCategories(categories.data.categories)
				setDatabase({
					...database,
					categories: categories.data.categories,
				})
			})
			.catch((err) => {
				console.log(err)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			<h1 className='text-5xl text-gray flex items-center gap-4'>
				{icon}Danh mục sản phẩm
			</h1>
			<div className='mt-[5rem]'>
				<table className='w-full text-md rtl:text-right text-gray-500 text-gray-400 border border-[#ddd] border-solid text-center'>
					<TableHeader />
					<TableBody
						categories={categories}
						handleDeleteCategory={handleDeleteCategory}
						setCategoryEdit={setCategoryEdit}
					/>
				</table>
				<div className='mt-[5rem] text-4xl text-gray'>
					<h3>Sửa danh mục ({categoryEdit.oldName})</h3>
					<div className='flex items-center gap-4'>
						<input
							type='text'
							placeholder='Nhập danh mục'
							className='flex-[2]'
							value={categoryEdit?.currentName || ''}
							onChange={(e) =>
								setCategoryEdit({
									...categoryEdit,
									currentName: e.target.value,
								})
							}
						/>
						<ThemeProvider
							theme={createTheme({ typography: { fontSize: 20 } })}
						>
							<FormControl
								required
								sx={{ m: 1, minWidth: 120 }}
								style={{ flex: '2' }}
							>
								<InputLabel id='demo-simple-select-required-label'>
									chọn
								</InputLabel>
								<Select
									labelId='demo-simple-select-required-label'
									id='demo-simple-select-required'
									label='Age *'
									onChange={(e) =>
										setCategoryEdit({
											...categoryEdit,
											parentName: e.target.value,
										})
									}
									value={categoryEdit?.parentName || ''}
								>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									{categories.map((category, index) => (
										<MenuItem
											value={category.name}
											className='capitalize'
											key={index}
										>
											{category.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</ThemeProvider>
						<Button
							primary
							lg
							onClick={handleEditCategory}
						>
							Sửa
						</Button>
					</div>
				</div>
				<div className='mt-[5rem] text-4xl text-gray'>
					<h3>Thêm danh mục</h3>
					<div className='flex items-center gap-4'>
						<input
							type='text'
							placeholder='Nhập danh mục'
							className='flex-[2]'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						/>
						<ThemeProvider
							theme={createTheme({ typography: { fontSize: 20 } })}
						>
							<FormControl
								required
								sx={{ m: 1, minWidth: 120 }}
								style={{ flex: '2' }}
							>
								<InputLabel id='demo-simple-select-required-label'>
									chọn
								</InputLabel>
								<Select
									labelId='demo-simple-select-required-label'
									id='demo-simple-select-required'
									label='Age *'
									onChange={(e) => setParenCategory(e.target.value)}
									value={parentCategory || ''}
								>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									{categories.map((category, index) => (
										<MenuItem
											value={category.name}
											className='capitalize'
											key={index}
										>
											{category.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</ThemeProvider>
						<Button
							primary
							lg
							onClick={handleAddCategory}
						>
							Thêm
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

const TableHeader = () => {
	return (
		<thead className='text-md text-gray-700 text-gray-400 bg-[#ddd]'>
			<tr>
				<th
					scope='col'
					className='w-[10%] px-6 py-3'
				>
					STT
				</th>
				<th
					scope='col'
					className='px-6 py-3'
				>
					Mã danh mục
				</th>
				<th
					scope='col'
					className='px-6 py-3'
				>
					Tên danh mục
				</th>
				<th
					scope='col'
					className='px-6 py-3'
				>
					Tên danh mục gốc
				</th>
				<th
					scope='col'
					className='px-6 py-3'
				>
					Thao tác
				</th>
			</tr>
		</thead>
	)
}

const TableBody = ({ categories, handleDeleteCategory, setCategoryEdit }) => {
	return (
		<tbody className='text-center'>
			{categories.map((row, parentIndex) => (
				<React.Fragment key={parentIndex}>
					{row.children.map((item, index) => (
						<tr
							className='border-b-[#ddd] border-solid'
							key={item._id}
						>
							<td className='border-[#ddd] border-solid border px-6 py-3'>
								{(parentIndex + 1) * index}
							</td>
							<td className='border-[#ddd] border-solid border px-6 py-3'>
								{item._id}
							</td>
							<td className='border-[#ddd] border-solid border px-6 py-3'>
								{item.name}
							</td>
							<td className='border-[#ddd] border-solid border px-6 py-3'>
								{row.name}
							</td>
							<td className='border-[#ddd] border-solid border px-6 py-3 flex gap-6 justify-center'>
								<FontAwesomeIcon
									icon={faPenFancy}
									className='cursor-pointer hover:text-pri'
									onClick={() =>
										setCategoryEdit((prev) => {
											return { ...prev, oldName: item.name }
										})
									}
								/>
								<FontAwesomeIcon
									icon={faTrash}
									className='cursor-pointer hover:text-pri'
									onClick={() => handleDeleteCategory(item.name, row.name)}
								/>
							</td>
						</tr>
					))}
				</React.Fragment>
			))}
		</tbody>
	)
}

export default Category
