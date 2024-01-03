import React from 'react'

import s from './Promotion.module.scss'

const Promotion = ({ icon, children }) => {
	return (
		<div className={s.promotion}>
			<span className={s.icon}>{icon}</span>
			<span className={s.paras}>{children}</span>
		</div>
	)
}

export default Promotion
