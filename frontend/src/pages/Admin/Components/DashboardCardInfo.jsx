import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

const DashboardCardInfo = ({ icon, title, content, colorIcon }) => {
	return (
		<div className='bg-white max-w-[25rem] aspect-3/2 w-full rounded-2xl p-6 flex flex-col justify-between shrink-0 shadow-lg'>
			<div className='flex justify-between flex-1 pb-4'>
				<span className={`text-7xl self-center ${colorIcon}`}>{icon}</span>
				<div className='flex flex-col justify-between'>
					<h3 className='text-right text-4xl'>{title}</h3>
					<p className='text-4xl text-right font-bold'>{content}</p>
				</div>
			</div>
			<div className='cursor-pointer text-[#bbb] p-4 mt-auto flex items-center gap-4 border-t border-t-light-white border-solid select-none'>
				<FontAwesomeIcon icon={faArrowsRotate} />
				<span>Update now</span>
			</div>
		</div>
	)
}

export default DashboardCardInfo
