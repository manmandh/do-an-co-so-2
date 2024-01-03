import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ROLE } from '~/constants/constant'
import useAuth from '~/hooks/useAuth'
import { UserContext } from './UserContext'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
	const [isOpenCarts, setIsOpenCarts] = useState(false)
	const { user } = useContext(UserContext)
	const [cartList, setCartList] = useState([])
	const auth = useAuth()

	useEffect(() => {
		console.log('cartList data effect')
		if (!user._id) return
		if (auth === ROLE.User) {
			axios
				.get(`http://localhost:5000/cart`)
				.then((res) => setCartList(res.data.carts))
				.catch((err) => toast.error(err))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user._id])

	return (
		<AppContext.Provider
			value={{ isOpenCarts, setIsOpenCarts, cartList, setCartList }}
		>
			{children}
		</AppContext.Provider>
	)
}
