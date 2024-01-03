import React from 'react'

import style from '../Globals.module.scss'

const RefundOrder = () => {
	return (
		<section className='body-content'>
			<div className='wrapper'>
				<h1 className={style.heading}>Hoàn trả đơn hàng</h1>
				<p className={style.step}>
					<b>1, Chính sách trả hàng và hoàn tiền của ND</b>
				</p>
				<p className={style.step}>
					Trong chính sách bảo vệ quyền lợi của người mua hàng, ND có quy định
					về vấn đề đổi hàng, trả hàng nếu sản phẩm bị lỗi, sai mẫu mã,…trong
					vòng 3 ngày kể từ khi tình trạng trên app được cập nhật là “đã nhận
					được hàng” đối với gian hàng không phải ND Mall và 7 ngày đối với gian
					hàng ND Mall.
				</p>
				<p className={style.step}>
					Sau đó ND sẽ cập nhật tiến trình xử lý qua email hoặc trong mục “thông
					báo” -{'>'} “cập nhật đơn hàng” trên ứng dụng ND
				</p>
				<p className={style.step}>
					<b>2, Quy dẫn đổi trả hàng ND</b>
				</p>
				<p className={style.step}>
					Đối với những gian hàng có logo của ND Mall vẫn chưa có chính sách đổi
					hàng mà chỉ có dịch vụ trả hàng hoàn tiền trong vòng 7 ngày kể từ khi
					nhân được hàng, đối với những sản phẩm bị lỗi, hết hạn sử dụng hoặc
					sai mẫu mã,...
				</p>
				<p className={style.step}>
					Bước 1: Truy cập vào trang web của ND và đăng nhập tài khoản của bạn.
				</p>
				<p className={style.step}>
					Bước 2: Chọn mục Tôi -{'>'} trả hàng hoàn tiền -{'>'} chọn Đơn hàng
					cần phản hồi -{'>'} bấm Chi tiết trả hàng hoàn tiền.
				</p>
				<p className={style.step}>
					Bước 3 Kiểm tra kỹ số tiền hoàn mà người bán đề xuất -{'>'} Nếu bạn
					cảm thấy hợp lý, chọn Trao đổi thêm -{'>'} Đồng ý (Để nhận được tiền
					hoàn ngay mà không cần trả hàng)
				</p>
				<p className={style.step}>
					Bước 4 Nếu bạn không đồng ý với số tiền người bán đề xuất -{'>'} chọn
					Tôi muốn trả hàng (Để thực hiện trả hàng và nhận lại toàn bộ số tiền
					đã thanh toán)
				</p>

				<p className={style.step}>
					<b>Cách đổi trả hàng trên app điện thoại ND</b>
				</p>
				<p className={style.step}>
					Bước 1 Sau khi truy cập vào app ND và đăng nhập tài khoản.
				</p>
				<p className={style.step}>Bước 2 Chọn mục tôi -{'>'} đang giao.</p>
				<p className={style.step}>
					Bước 3 Chọn đơn hàng mà bạn cần yêu cầu trả hàng hoàn tiền -{'>'} nhấn
					vào trả hàng hoàn tiền.
				</p>
				<p className={style.step}>
					Bước 4 Chọn lý do trả hàng, thêm hình ảnh và video để làm bằng chứng.
				</p>
				<p className={style.step}>
					Bước 5 Chọn phương án thanh toán, nhập email và nhấn hoàn thành.
				</p>

				<p className={style.step}>
					<b>Chờ phản hồi từ người bán về yêu cầu đổi trả hàng</b>
				</p>
				<p className={style.step}>
					Sau khi đã yêu cầu trả hàng hoàn tiền bạn cần chờ phản hồi từ người
					bán để tiến hành bước tiếp theo.
				</p>
				<p className={style.step}>
					Nếu người bán đồng ý “hoàn tiền ngay” thì bạn sẽ không phải trả hàng
					lại cho shop. <br />
					Nếu người bán đồng ý “trả hàng hoàn tiền” thì trong thời hạn 6 ngày,
					bạn cần gói hàng và gửi hàng xác nhận lại cho shop.
				</p>
				<p className={style.step}>
					<b> Cách thức và thời gian hoàn tiền</b>
				</p>
				<p className={style.step}>
					Khi Người bán đã nhận được hàng hoàn trả và đồng ý với sản phẩm trả
					về, ND sẽ hoàn tiền cho bạn.
				</p>
				<p className={style.step}>
					Thời gian hoàn tiền là sau 3 – 5 ngày làm việc kể từ ngày ND quyết
					định hoàn tiền, đối với hình thức thanh toán khi nhận hàng và thanh
					toán bằng ví ND pay, số tiền sẽ được hoàn vào ví ND.
				</p>
				<p className={style.step}>
					Thời gian hoàn tiền là sau 7 – 16 ngày làm việc kể từ ngày ND quyết
					định hoàn tiền, đối với hình thức thanh toán bằng thẻ tín dụng, số
					tiền sẽ được hoàn trả lại thẻ.{' '}
				</p>
			</div>
		</section>
	)
}

export default RefundOrder
