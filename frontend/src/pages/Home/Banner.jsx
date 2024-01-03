import React from 'react'
import { SlideImages } from '~/assets/images/Images'
import SlideShow from '~/components/SlideShow/SlideShow'

const Banner = () => {
	return (
		<div className='grid grid-cols-3 gap-8'>
			<SlideShow
				images={SlideImages}
				className={'col-span-2 row-span-3'}
			/>
			<img
				src={SlideImages[0]}
				alt=''
			/>
			<img
				src={SlideImages[1]}
				alt=''
			/>
			<img
				src={SlideImages[2]}
				alt=''
			/>
		</div>
	)
}

export default Banner
