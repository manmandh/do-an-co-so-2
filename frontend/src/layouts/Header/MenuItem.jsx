import React from 'react'
import { Link } from 'react-router-dom'

const MenuItem = ({ className, parent = 'menu' }) => {
	return (
		<li className={parent ?? 'submenu'}>
			<Link
				to='#!'
				className={className}
			></Link>
		</li>
	)
}

export default MenuItem
