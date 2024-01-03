import React from 'react'

import style from '../Globals.module.scss'

const Delivery = () => {
	return (
		<section className='body-content'>
			<div className='wrapper'>
				<h1 className={style.heading}>Phương thức vận chuyển</h1>
				<p className={style.step}>
					Các hình thức giao hàng của ND bao gồm 3 hình thức sau:
				</p>
				<p className={style.step}>Giao hàng tiết kiệm</p>
				<p className={style.step}>Giao hàng NDNow</p>
				<p className={style.step}>
					Hãy cùng tìm hiểu về 3 hình thức giao hàng trên ngay dưới đây nhé!
				</p>
				<p className={style.step}>Giao Hàng Tiêu Chuẩn</p>
				<p className={style.step}>
					Giao hàng tiêu chuẩn của ND là hình thức giao hàng khá phổ biến và có
					nhiều người lựa chọn bởi mức giá hợp lý của hình thức giao hàng này.
					Tuy nhiên hình thức giao này mức giá vẫn cao hơn ND Fast giao tiết
					kiệm. Hình thức giao hàng này khá phù hợp với những người cần nhận
					hàng trong thời gian ngắn.
				</p>
				<p className={style.step}>Giao Hàng Tiết Kiệm</p>
				<p className={style.step}>
					Giao tiết kiệm cũng là hình thức được nhiều nhà bán lựa chọn bởi mức
					phí của hình thức này là rẻ nhất. Tuy nhiên, bạn cần lưu ý rằng thời
					gian bạn được nhận hàng có thể sẽ rất lâu. Hình thức giao hàng này khá
					phù hợp với những người không cần nhận đơn hàng quá gấp.
				</p>
				<p className={style.step}>Giao Hàng NDNOW</p>
				<p className={style.step}>
					Đây chính là hình thức mang đến tiếng vang cho ND khi chỉ giao hàng
					đến người nhận trong 2 tiếng đồng hồ. Khi chọn hình thức giao hàng
					này, người nhân có thể nhận đơn hàng trong thời gian rất ngắn, dù là
					ngày nghỉ hay ngày lễ. Tuy nhiên, mức phí vận chuyển của hình thức này
					khá cao, người mua nên cân nhắc khi chọn hình thức này.
				</p>
				<p className={style.step}>
					Tuy nhiên, bạn nên lưu ý không phải sản phẩm nào cũng có thể sử dụng
					hình thức giao hàng này. NDNow chỉ áp dụng cho những sản phẩm có biểu
					tượng NDNow và áp dụng ở một số thành phố lớn như Hà Nội, TPHCM, Đà
					Nẵng,…
				</p>
			</div>
		</section>
	)
}

export default Delivery
