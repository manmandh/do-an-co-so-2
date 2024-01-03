import { ROLE } from '~/constants/constant'

const useAuth = () => {
	const user = JSON.parse(localStorage.getItem('user'))

	return user ? (user.isAdmin ? ROLE.Admin : ROLE.User) : ROLE.NO_ONE
}

export default useAuth
