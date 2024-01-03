import logo from '~/assets/images/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBars,
	faCartShopping,
	faHeart,
	faMagnifyingGlass,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '~/context/AppContext'

const HeaderTop = ({ toggleActiveMenu }) => {
	const placeholders = [
		'Bạn cần tìm gì..',
		'Tìm kiếm sản phẩm..',
		'Công cụ tìm kiếm mạnh mẽ..',
	]
	const [searchInput, setSearchInput] = useState('')
	const [placeholder, setPlaceholder] = useState('')
	const [placeholderIndex, setPlaceholderIndex] = useState(0)
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
	const [toRight, setToRight] = useState(true)
	const { setIsOpenCarts, cartList } = useContext(AppContext)
	const navigate = useNavigate()

	const openCarts = () => {
		setIsOpenCarts((isOpen) => !isOpen)
	}

	useEffect(() => {
		const intr = setTimeout(() => {
			if (placeholderIndex + 1 < placeholders[currentPlaceholder].length) {
				if (toRight) {
					setPlaceholderIndex(placeholderIndex + 1)
				} else {
					if (placeholderIndex < 0) {
						setToRight(true)
						setPlaceholderIndex(placeholderIndex + 1)
						setCurrentPlaceholder(
							(currentPlaceholder + 1) % placeholders.length
						)
					} else {
						setPlaceholderIndex(placeholderIndex - 1)
					}
				}
			} else {
				setTimeout(() => {
					setPlaceholderIndex(placeholderIndex - 1)
					setToRight(false)
				}, 1000)
			}
			setPlaceholder(
				placeholders[currentPlaceholder].slice(0, placeholderIndex + 1)
			)
		}, 50)
		return () => {
			clearTimeout(intr)
		}
	})

	const handleSearch = (e) => {
		e.preventDefault()
		if (searchInput.trim()) {
			navigate(`find/${searchInput}`)
		}
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			if (searchInput.trim()) {
				navigate(`find/${searchInput}`)
				setSearchInput('')
			}
		}
	}

	return (
		<div className='header-top'>
			<div className='header-top-wrapper'>
				<figure className='header-logo'>
					<img
						src={logo}
						alt='MCart'
						className='header-logo-img'
					/>
				</figure>
				<div className='header-search'>
					<label htmlFor='search-field'>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</label>
					<input
						type='text'
						placeholder={placeholder}
						name='product-name'
						className='search-field'
						id='search-field'
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<button
						type='button'
						className='search-btn'
						onClick={handleSearch}
					>
						Tìm kiếm
					</button>
				</div>
				<div className='header-top-more'>
					<FontAwesomeIcon
						icon={faBars}
						className='main-more'
						onClick={toggleActiveMenu}
					/>
					<Link to={'favorites'}>
						<FontAwesomeIcon icon={faHeart} />
					</Link>
					<Link to='profile'>
						<FontAwesomeIcon icon={faUser} />
					</Link>
					<span
						href='#!'
						className='cart-icon'
					>
						<FontAwesomeIcon
							icon={faCartShopping}
							onClick={openCarts}
						/>
						<span className='cart-number'>{cartList?.length}</span>
					</span>
				</div>
			</div>
		</div>
	)
}

export default HeaderTop
