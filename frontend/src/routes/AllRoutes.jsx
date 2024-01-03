import {
	Navigate,
	Outlet,
	createBrowserRouter,
	useLocation,
} from 'react-router-dom'

import Home from '~/pages/Home/Home'
import Introduce from '~/pages/Introduce/Introduce'
import Contact from '~/pages/Contact/Contact'
import New from '~/pages/New/New'
import Favorites from '~/pages/Favorite/Favorites'
import Support from '~/pages/Support/Support'
import Questions from '~/pages/Questions/Questions'
import Products from '~/pages/Product/Products'
import Auth from '~/pages/Auth/Auth'
import Policies from '~/pages/Policy/Policies'
import Delivery from '~/pages/Delivery/Delivery'
import RefundOrder from '~/pages/Refund/RefundOrder'
import Header from '~/layouts/Header/Header'
import Footer from '~/layouts/Footer/Footer'
import Carts from '../pages/Cart/Carts'
import { AppProvider } from '~/context/AppContext'
import NotFound from '~/pages/NotFound/NotFound'
import Body from '../pages/Body'
import Product from '~/pages/Product/Product'

import { useEffect } from 'react'
import Profile from '~/pages/Profile/Profile'
import PrivateRoutes from './PrivateRoutes'
import FindProduct from '~/pages/FindProduct/FindProduct'
import Admin from '~/pages/Admin/Admin'
import useAuth from '~/hooks/useAuth'
import { ROLE } from '~/constants/constant'
import MainPage from '~/pages/Admin/Components/MainPage'
import ProductsEdit from '~/pages/Admin/Layouts/ProductsEdit'

const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window && window.scrollTo(0, 0)
	}, [pathname])

	return null
}

const Container = () => {
	const auth = useAuth()
	return auth === ROLE.Admin ? <Navigate to={'/admin'} /> : <Outlet />
}

const Layout = () => {
	return (
		<>
			<ScrollToTop />
			<AppProvider>
				<Header />
				<Carts />
				<Body />
				<Footer />
			</AppProvider>
		</>
	)
}

const AllRoutes = createBrowserRouter([
	{
		element: <Container />,
		children: [
			{
				path: '/',
				element: <Layout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						element: <PrivateRoutes />,
						children: [
							{
								path: 'profile',
								element: <Profile />,
							},
							{
								path: 'favorites',
								element: <Favorites />,
							},
						],
					},
					{
						path: 'auth',
						element: <Auth />,
					},
					{
						path: 'introduce',
						element: <Introduce />,
					},
					{
						path: 'contact',
						element: <Contact />,
					},
					{
						path: 'products',
						element: <Products />,
						children: [
							{
								path: ':id',
							},
						],
					},
					{
						path: 'product/:productId',
						element: <Product />,
					},
					{
						path: 'find/:product',
						element: <FindProduct />,
					},
					{
						path: 'news',
						element: <New />,
					},
					{
						path: 'support',
						element: <Support />,
					},
					{
						path: 'questions',
						element: <Questions />,
					},
					{
						path: 'policy',
						element: <Policies />,
					},
					{
						path: 'shipping-method',
						element: <Delivery />,
					},
					{
						path: 'refund-order',
						element: <RefundOrder />,
					},
				],
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
	{
		path: '/admin',
		element: <Admin />,
		children: [
			{
				path: '',
				element: <MainPage />,
			},
			{
				path: 'products/:product_id',
				element: <ProductsEdit />,
			},
		],
	},
])

export default AllRoutes
