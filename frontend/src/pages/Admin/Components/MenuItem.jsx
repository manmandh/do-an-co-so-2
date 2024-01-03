import React from 'react'

const MenuItem = ({ setCurrentPanel, children, isActive }) => {
	const classes = `p-6 hover:bg-[#263e60] text-md flex items-center gap-4 cursor-pointer transition-all rounded-lg ${
		isActive ? 'bg-[#263e60]' : ''
	}`
	return (
		<div
			className={classes}
			onClick={setCurrentPanel}
		>
			{children}
		</div>
	)
}

export default MenuItem
