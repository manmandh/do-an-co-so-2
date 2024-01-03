import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules'

import './SlideShow.scss'

const SlideShow = ({ images, className }) => {
	return (
		<div className={className}>
			<Swiper
				spaceBetween={30}
				effect={'fade'}
				navigation={true}
				pagination={{
					clickable: true,
				}}
				modules={[EffectFade, Navigation, Pagination, Autoplay]}
				grabCursor={true}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				className={`mySwiper`}
				loop={true}
			>
				{images.map((image, index) => {
					return (
						<SwiperSlide key={index}>
							<img
								src={image}
								alt='slide'
							/>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>
	)
}

export default SlideShow
