import { createContext, useState } from 'react'

export const DataContext = createContext({})
const defaultData = {}

export const DataProvider = ({ children }) => {
	const [database, setDatabase] = useState(defaultData)

	return (
		<DataContext.Provider value={{ database, setDatabase }}>
			{children}
		</DataContext.Provider>
	)
}
