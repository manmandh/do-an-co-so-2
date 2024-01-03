import React from 'react'

import s from './Cart.module.scss'
import Cart from './Cart'
import Button from '../Button/Button'

const Carts = ({ cartList, scroll, seeMore }) => {
	return (
		<section className={s.wrapper}>
			<div className={`${scroll ? s.scroll : s.carts}`}>
				{cartList.map((cart) => {
					return (
						<Cart
							key={cart._id}
							sale={cart.sale.percent !== 0 && cart.sale.percent}
							secondPrice={cart.products[0].price}
							originPrice={cart.products[0].price}
							badge={cart.label}
							name={cart.name}
							id={cart._id}
							poster={cart.products[0].thumb.url}
						/>
					)
				})}
			</div>
			<div className={s.seeMore}>
				<Button
					outline
					xl
					to={'/products'}
				>
					Xem thêm
				</Button>
			</div>
		</section>
	)
}

export default Carts
