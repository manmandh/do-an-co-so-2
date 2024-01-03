/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'

import s from './Carts.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { AppContext } from '~/context/AppContext'
import Button from '../../components/Button/Button'
import CartItem from './CartItem/CartItem'
import { formatMoneyTo } from '~/helper'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { UserContext } from '~/context/UserContext'

const Carts = () => {
	const { isOpenCarts, setIsOpenCarts, cartList, setCartList } =
		useContext(AppContext)
	const [selectAll, setSelectAll] = useState(false)
	const [selectList, setSelectList] = useState([])
	const { user } = useContext(UserContext)

	const closeCarts = () => {
		setIsOpenCarts(false)
	}

	const handleChangeSelecAll = () => {
		setSelectAll(!selectAll)
		const newList = selectList.map((select) => ({
			...select,
			selected: !selectAll,
		}))
		setSelectList(newList)
	}

	const handleChangeSelect = (id) => {
		const newList = selectList.map((select) => {
			return {
				...select,
				selected: id === select._id ? !select.selected : select.selected,
			}
		})
		setSelectList(newList)
	}

	const handleOrder = () => {
		if (!user.address) {
			toast.error('Bạn cần cập nhật thông tin địa chỉ ')
			return
		}
		if (!JSON.parse(localStorage.getItem('user')).phone) {
			toast.error('Bạn cần cập nhật thông tin số điện thoại')
			return
		}
		const ids = selectList
			.map((select) => (select.selected ? select._id : -1))
			.filter((id) => id !== -1)
		const newSelectList = selectList.filter((select) => !select.selected)
		const newCartList = cartList.filter((cart) => !ids.includes(cart._id))
		setSelectList(newSelectList)
		setCartList(newCartList)
		if (!ids.length) {
			toast.error('Bạn chưa chọn sản phẩm nào')
			return
		}
		axios
			.delete(`http://localhost:5000/cart/multiple`, { params: { ids } })
			.then((res) => console.log(res.data))
			.catch((err) => toast.error(err))
		const orders = selectList.map((order) => ({
			userId: user._id,
			productId: order.productId,
			optionId: order._id,
		}))

		axios
			.post(`http://localhost:5000/order`, orders)
			.then((res) => console.log(res.data))
			.catch((err) => toast.error(err))
	}

	useEffect(() => {
		const list = cartList.map((cart) => {
			return {
				...cart,
				selected: cart.selected ?? false,
			}
		})
		setSelectList(list)
	}, [cartList])

	return (
		<>
			<section className={`${s.side} ${isOpenCarts ? s.active : ''}`}>
				<div className={s.wrapper}>
					<div className={s.top}>
						<div className={s.topLeft}>
							<span>Giỏ hàng</span>
							<span>({cartList?.length} sản phẩm)</span>
						</div>
						<div
							className={s.topRight}
							onClick={closeCarts}
						>
							<FontAwesomeIcon icon={faXmark} />
						</div>
					</div>
					{cartList?.length > 0 && (
						<div className='mt-4 flex items-center gap-8'>
							<input
								type='checkbox'
								id='select-all'
								defaultChecked={selectAll}
								onChange={handleChangeSelecAll}
							/>
							<label
								htmlFor='select-all'
								className='select-none'
							>
								Chọn tất cả
							</label>
						</div>
					)}
					<div className={s.bottom}>
						{selectList?.map((cart) => {
							return (
								<CartItem
									name={cart?.product_name}
									price={cart?.product_price}
									quantities={cart?.quantity}
									img={cart?.thumb}
									id={cart?.productId}
									cartId={cart?._id}
									selected={cart?.selected}
									onChangeSelected={handleChangeSelect}
									key={cart?._id}
								/>
							)
						})}
					</div>
					<div className={`${s.pay} pt-8 flex flex-col gap-4`}>
						<div className={s.payTop}>
							<span className={s.moneyText}>Thành tiền: </span>
							<span className={s.money}>
								{formatMoneyTo(
									selectList.reduce((acc, cart) => {
										const result = cart.selected ? cart.product_price : 0
										return result * cart?.quantity + acc
									}, 0)
								)}
							</span>
						</div>
						<Button
							primary
							bg
							xl
							full
							onClick={handleOrder}
						>
							Đặt hàng
						</Button>
						<Button
							primary
							bg
							xl
							full
							onClick={handleOrder}
						>
							Xem toàn bộ đơn hàng
						</Button>
					</div>
				</div>
			</section>
			<div
				className={`${s.overlay} ${isOpenCarts ? s.active : ''}`}
				onClick={closeCarts}
			></div>
		</>
	)
}

export default Carts
