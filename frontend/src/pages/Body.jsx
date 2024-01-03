import React from 'react'
import { Outlet } from 'react-router-dom'

const Body = () => {
	return (
		<main className='body-content'>
			<div className='wrapper'>
				<Outlet />
			</div>
		</main>
	)
}

export default Body
