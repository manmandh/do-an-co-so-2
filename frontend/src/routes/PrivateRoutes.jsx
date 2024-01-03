import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROLE } from '~/constants/constant'
import useAuth from '~/hooks/useAuth'

const PrivateRoutes = () => {
	const isLogin = localStorage.getItem('isLogin')
	const auth = useAuth()
	let Component = <></>
	if (isLogin) {
		if (auth === ROLE.Admin) Component = <Navigate to={'/admin'} />
		else Component = <Outlet />
	} else {
		Component = <Navigate to={'auth'} />
	}

	return Component
}

export default PrivateRoutes
