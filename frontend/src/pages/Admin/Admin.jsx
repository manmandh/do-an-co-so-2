import React from 'react'

import SideBar from './Components/SideBar'
import { SideBarAdminProvider } from '~/context/SideBarAdminContext'
import { Outlet } from 'react-router-dom'

const Admin = () => {
	return (
		<SideBarAdminProvider>
			<main className={`flex h-screen bg-white`}>
				<SideBar />
				<div className='flex-[4] bg-[#f7f9fa] p-10 overflow-auto'>
					<Outlet />
				</div>
			</main>
		</SideBarAdminProvider>
	)
}

export default Admin
