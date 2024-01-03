import React from 'react'

import s from '../Products.module.scss'

const NewItem = ({ img, link, children }) => {
	return (
		<div className={`flex gap-4`}>
			<a
				href='#!'
				className={s.newImage}
			>
				<img
					src={img}
					alt='news'
				/>
			</a>
			<div>
				<a
					href='#!'
					className={`line-clamp-2 leading-tight hover:text-red-500`}
				>
					{children}
				</a>
			</div>
		</div>
	)
}

export default NewItem
