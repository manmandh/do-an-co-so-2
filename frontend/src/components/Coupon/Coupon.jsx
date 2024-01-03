import React from 'react'

import s from './Coupon.module.scss'

const Coupon = ({ content = '' }) => {
	return (
		<span className={s.coupon}>
			{content}
			<span className={s.bg}></span>
		</span>
	)
}

export default Coupon
