import React, { useContext } from 'react'

import s from '../Carts.module.scss'
import CartNumberSelect from '../CartSelect/CartNumberSelect'
import { formatMoneyTo } from '~/helper'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { AppContext } from '~/context/AppContext'

const CartItem = ({
	name,
	quantities,
	price,
	img,
	id,
	cartId,
	selected,
	onChangeSelected,
}) => {
	const { setCartList } = useContext(AppContext)

	const handleDeleteCart = () => {
		axios
			.delete(`http://localhost:5000/cart`, { params: { _id: cartId } })
			.then((res) => {
				console.log(res.data)
				toast.success(res?.data?.msg)
			})
			.catch((err) => toast.error(err))
		setCartList((prev) => prev.filter((cart) => cart._id !== cartId))
	}
	return (
		<div className={s.item}>
			<input
				type='checkbox'
				checked={selected}
				onChange={() => onChangeSelected(cartId)}
			/>
			<a
				href={`/product/${id}`}
				className={s.imageWrap}
			>
				<img
					src={img}
					alt=''
					className={s.image}
				/>
			</a>
			<div className={s.info}>
				<a
					href={`/product/${id}`}
					className={s.name}
				>
					{name}
				</a>
				<div className={s.infoBottom}>
					<div className={s.infoBottomLeft}>
						<span className={s.quantity}>Số lượng: </span>
						<CartNumberSelect quantities={quantities} />
					</div>
					<div className={s.infoBottomRight}>
						<h5 className={s.cost}>{formatMoneyTo(price)}</h5>
						<span
							className={s.delete}
							onClick={handleDeleteCart}
						>
							Bỏ sản phẩm
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartItem
