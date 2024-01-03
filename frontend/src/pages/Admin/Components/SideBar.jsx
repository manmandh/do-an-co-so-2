import React, { useContext } from 'react'
import MenuItem from './MenuItem'
import MenuMap from '../MenuMap'
import { SideBarAdminContext } from '~/context/SideBarAdminContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '~/context/UserContext'

const SideBar = () => {
	const { currentPanel, setCurrentPanel } = useContext(SideBarAdminContext)
	const { setUser } = useContext(UserContext)
	const navigate = useNavigate()
	const handleLogout = () => {
		localStorage.clear()
		setUser({})
		navigate('/auth')
	}
	return (
		<section
			className={`p-8 flex flex-col flex-1 bg-[#1f2937] text-white overflow-auto`}
		>
			<h3 className={`mb-8`}>Hi Admin</h3>
			<div className='flex flex-col gap-2'>
				{MenuMap.map((item, index) => (
					<MenuItem
						key={index}
						isActive={index === currentPanel}
						setCurrentPanel={() => setCurrentPanel(index)}
					>
						{item.icon}
						<span>{item.name}</span>
					</MenuItem>
				))}
			</div>
			<div
				className='mt-auto flex items-center gap-4 cursor-pointer hover:bg-[#263e60] p-6 rounded-lg'
				onClick={handleLogout}
			>
				<FontAwesomeIcon icon={faArrowRightFromBracket} />
				<span>Đăng xuất</span>
			</div>
		</section>
	)
}

export default SideBar
