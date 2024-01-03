import { useEffect } from 'react'
import WebFont from 'webfontloader'
import { RouterProvider } from 'react-router-dom'

import './assets/stylesheets/main.css'
import './assets/stylesheets/main.scss'
import AllRoutes from './routes/AllRoutes'
import { UserProvider } from './context/UserContext'
import { DataProvider } from './context/DataContext'
import { Toaster } from 'react-hot-toast'

function App() {
	useEffect(() => {
		WebFont.load({
			google: {
				families: ['Poppins', 'Roboto', 'Chilanka'],
			},
		})
	})

	return (
		<UserProvider>
			<DataProvider>
				<div className='App'>
					<Toaster />
					<RouterProvider router={AllRoutes} />
				</div>
			</DataProvider>
		</UserProvider>
	)
}

export default App
