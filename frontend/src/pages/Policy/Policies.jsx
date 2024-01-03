import React from 'react'

import style from '../Globals.module.scss'

const Policies = () => {
	return (
		<section className='body-content'>
			<div className='wrapper'>
				<h1 className={style.heading}>Chính sách kiểm hàng</h1>
				<p className={style.step}>
					1. Khi sản phẩm gặp phải các lỗi không thể phát hiện khi kiểm tra phải
					làm sao?
				</p>
				<p className={style.step}>
					Chính sách kiểm tra hàng của ND chỉ cho kiểm tra ngoại quan sản phẩm
					mà không cho phép mở seal hay kiểm tra sâu, vì vậy, trong trường hợp
					sau khi nhận hàng thành công, bạn tiến hành kiểm tra và phát hiện một
					số lỗi sản phẩm không thể phát hiện khi kiểm tra hàng với nhân viên.
				</p>
				<p className={style.step}>
					Chẳng hạn như sản phẩm không giống mô tả, không đảm bảo chất lượng
					hoặc không hoạt động… bạn có thể liên hệ đến ND để được hỗ trợ. ND có
					đầy đủ chính sách đổi trả, bảo hành và bồi hoàn sản phẩm, giúp đảm bảo
					quyền lợi tốt nhất cho khách hàng.
				</p>
				<p className={style.step}>
					2. Nếu nhân viên giao hàng của ND không cho kiểm tra hàng thì phải làm
					sao?
				</p>
				<p className={style.step}>
					Bạn biết rõ ND có cho kiểm tra hàng không. Vậy nhưng, nếu nhân viên
					giao hàng không cho phép kiểm tra khi nhận hàng, bạn có thể phản ánh,
					khiếu nại bằng hệ thống ND Care hoặc cách liên hệ đến tổng 1900 6035 –
					tổng đài đài chăm sóc khách hàng của ND để được ND hỗ trợ giải quyết
					hoặc bạn có thể từ chối nhận hàng.
				</p>
				<p className={style.step}>
					3. Với những đơn hàng đã thanh toán, tôi có được hoàn tiền nếu từ chối
					nhận hàng khi kiểm tra không?
				</p>
				<p className={style.step}>
					Nếu đơn hàng đã thanh toán trước bằng ví điện tử, thẻ ATM hay thẻ tín
					dụng nhưng khi giao bạn lại từ chối nhận hàng do phát hiện sản phẩm
					không còn nguyên vẹn hoặc không giống mô tả, bạn vẫn có thể được hoàn
					tiền. Và số tiền hoàn này sẽ được ND hỗ trợ hoàn trả đầy đủ trong
					khoảng thời gian quy định.
				</p>
				<p className={style.step}>
					4. Người nhận hàng hộ có thể ký vào biên bản xác nhận đã kiểm tra thay
					tôi nếu tôi không tự mình nhận hàng được không?
				</p>
				<p className={style.step}>
					Nếu bạn không tự mình nhận hàng mà nhờ người thân, đồng nghiệp hay bạn
					bè nhận hộ thì họ hoàn toàn được phép ký vào biên bản xác nhận đã kiểm
					tra sau khi tiến hành kiểm tra và nhận hàng.
				</p>
				<p className={style.step}>
					5. Nên làm gì trong trường hợp quên kiểm tra sản phẩm khi nhận hàng
					nhưng sau đó lại phát hiện sản phẩm bị hư hỏng và không còn nguyên
					vẹn?
				</p>
				<p className={style.step}>
					Nếu bạn không kiểm tra sản phẩm khi nhận hàng nhưng lại phát hiện sản
					phẩm không còn nguyên vẹn hay bị hư hỏng sau đó, bạn có thể liên hệ
					đến ND để nhờ hỗ trợ hoặc nhấn trả hàng hoàn tiền.
				</p>
			</div>
		</section>
	)
}

export default Policies
