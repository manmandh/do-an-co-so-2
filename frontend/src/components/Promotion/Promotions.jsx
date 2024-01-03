import React from 'react'

import s from './Promotion.module.scss'
import Promotion from './Promotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCreditCard,
	faDolly,
	faGift,
	faMoneyBill1Wave,
} from '@fortawesome/free-solid-svg-icons'

const Promotions = () => {
	return (
		<div className={s.promotions}>
			<Promotion icon={<FontAwesomeIcon icon={faDolly} />}>
				<p>
					Vận chuyển <b>MIỄN PHÍ</b>
				</p>
				<p>
					Trong khu vực <b>TP.Đà Nẵng</b>
				</p>
			</Promotion>
			<Promotion icon={<FontAwesomeIcon icon={faGift} />}>
				<p>
					Đổi trả <b>MIỄN PHÍ</b>
				</p>
				<p>
					Trong vòng <b>30 NGÀY</b>
				</p>
			</Promotion>
			<Promotion icon={<FontAwesomeIcon icon={faCreditCard} />}>
				<p>
					Tiến hành <b>THANH TOÁN</b>
				</p>
				<p>
					Với nhiều <b>PHƯƠNG THỨC</b>
				</p>
			</Promotion>
			<Promotion icon={<FontAwesomeIcon icon={faMoneyBill1Wave} />}>
				<p>
					100% <b>HOÀN TIỀN</b>
				</p>
				<p>nếu sản phẩm lỗi</p>
			</Promotion>
		</div>
	)
}

export default Promotions
