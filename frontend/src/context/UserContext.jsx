import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})
const defaultUser = JSON.parse(localStorage.getItem('user'))
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(defaultUser ?? {})

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user))
	}, [user])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}
