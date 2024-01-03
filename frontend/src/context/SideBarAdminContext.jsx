import { createContext, useState } from 'react'

export const SideBarAdminContext = createContext({})

export const SideBarAdminProvider = ({ children }) => {
	const [currentPanel, setCurrentPanel] = useState(0)

	return (
		<SideBarAdminContext.Provider value={{ currentPanel, setCurrentPanel }}>
			{children}
		</SideBarAdminContext.Provider>
	)
}
