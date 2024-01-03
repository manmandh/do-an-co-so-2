import React, { useEffect, useState } from 'react'

import './Header.scss'
import HeaderTop from './HeaderTop'
import HeaderMenu from './HeaderMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Header = () => {
	const [active, setActive] = useState(false)
	const [categories, setCategories] = useState()

	const toggleActiveMenu = () => {
		setActive((active) => !active)
	}

	useEffect(() => {
		axios
			.get('http://localhost:5000/category/getall')
			.then((res) => {
				// console.log(res.data.categories)
				setCategories(res.data.categories)
			})
			.catch((err) => {
				toast.error(err)
			})
	}, [])

	return (
		<header className='header'>
			<HeaderTop toggleActiveMenu={toggleActiveMenu} />
			<HeaderMenu
				active={active}
				toggleActiveMenu={toggleActiveMenu}
				categories={categories}
			/>
		</header>
	)
}

export default Header
