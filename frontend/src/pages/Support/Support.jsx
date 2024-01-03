import React from 'react'

import style from './Support.module.scss'

const Support = () => {
	return (
		<section className={style.support}>
			<div className={style.wrapper}>
				<h1 className={style.heading}>Gửi yêu cầu hỗ trợ</h1>
				<p className={style.para}>
					Khi phát sinh các khiếu nại, tranh chấp, NTD đề cao giải pháp thương
					lượng, hòa giải giữa các bên nhằm duy trì mối quan hệ, sự tin cậy của
					Khách hàng vào chất lượng dịch vụ của ND.
				</p>
				<p className={style.para}>
					Quy trình khiếu nại thực hiện theo các bước sau:
				</p>
				<p className={style.para}>
					Bước 1: Khách hàng khiếu nại về hàng hóa, dịch vụ của Nhà Bán Hàng mua
					trên sàn thương mại điện tử NTD thực hiện qua:
				</p>
				<p className={style.para}>
					Gửi thư điện tử đến địa chỉ email: ngodat02012004@gmail.com <br /> Gọi
					điện đến Hotline: 0905 0 nằm 0 thích.
				</p>
				<p className={style.para}>Địa chỉ: Toà nhà cao trọc trời</p>
				<p className={style.para}>
					Bước 2: Bộ phận NTD Care sẽ tiếp nhận các khiếu nại, liên hệ làm rõ
					các yêu cầu của Khách hàng trong thời gian sớm nhất có thể và không
					quá 5 ngày làm việc, kể từ ngày nhận được yêu cầu. Tùy theo tính chất
					và mức độ của sự việc, ND sẽ có những biện pháp cụ thể để hỗ trợ khách
					hàng giải quyết khiếu nại, tranh chấp.
				</p>
				<p className={style.para}>
					Bước 3: NTD có thể yêu cầu Khách hàng và/hoặc Nhà Bán Hàng cung cấp
					các thông tin, bằng chứng liên quan đến giao dịch, sản phẩm để xác
					minh, làm rõ vụ việc và có hướng xử lý thích hợp.
				</p>
				<p className={style.para}>
					Bước 4: Trong trường hợp NTD đã nỗ lực giải quyết khiếu nại, tranh
					chấp nhưng sự việc vượt quá khả năng và thẩm quyền của NTD, NTD sẽ yêu
					cầu Khách hàng đưa vụ việc ra cơ quan Nhà nước có thẩm quyền giải
					quyết theo quy định của pháp luật.
				</p>
			</div>
		</section>
	)
}

export default Support
