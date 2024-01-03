import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const HeaderMenu = ({ active, toggleActiveMenu, categories = [] }) => {
	return (
		<nav className={`header-menu ${active ? 'active' : ''}`}>
			<ul className='menus'>
				<li className='menu'>
					<NavLink
						to={'/'}
						className='menu-link'
						onClick={toggleActiveMenu}
					>
						Trang chủ
					</NavLink>
				</li>
				<li className='menu'>
					<NavLink
						to={'/introduce'}
						className='menu-link'
						onClick={toggleActiveMenu}
					>
						Giới thiệu
					</NavLink>
				</li>
				<li className='menu'>
					<NavLink
						to={'/products'}
						className='menu-link'
						onClick={toggleActiveMenu}
					>
						Sản phẩm
						<FontAwesomeIcon icon={faChevronDown} />
					</NavLink>
					<ul className='submenu'>
						{categories.map((category) => (
							<li
								className='menu-child'
								key={category._id}
							>
								<h4 className='capitalize'>{category.name}</h4>
								{category.children.map((child) => (
									<a
										href='#!'
										className='menu-child-name'
										key={child._id}
									>
										{child.name}
									</a>
								))}
							</li>
						))}
					</ul>
				</li>
				<li className='menu'>
					<NavLink
						to={'/favorites'}
						className='menu-link'
						onClick={toggleActiveMenu}
					>
						Yêu thích
					</NavLink>
				</li>
				<li className='menu'>
					<NavLink
						to={'/contact'}
						className='menu-link'
						onClick={toggleActiveMenu}
					>
						Liên hệ
					</NavLink>
				</li>
				<li className='menu'>
					<NavLink
						to={'news'}
						className='menu-link'
						onClick={toggleActiveMenu}
					>
						Tin tức
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default HeaderMenu
