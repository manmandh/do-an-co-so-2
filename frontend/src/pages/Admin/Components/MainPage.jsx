import React, { useContext } from 'react'
import MenuMap from '../MenuMap'
import { SideBarAdminContext } from '~/context/SideBarAdminContext'

const MainPage = () => {
	const { currentPanel } = useContext(SideBarAdminContext)
	return <>{MenuMap[currentPanel].element}</>
}

export default MainPage
