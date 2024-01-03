import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { brandsLogo } from '~/assets/images/Images'

const BrandList = () => {
	return (
		<section className='bg-white p-8'>
			<div className='flex justify-between ss-title pb-4'>
				<h2 className='text-black font-semibold text-4xl'>
					<FontAwesomeIcon
						icon={faCheckCircle}
						className='text-pri mr-4'
					/>
					Thương hiệu chính hãng
				</h2>
				<a
					href='#!'
					className='text-base hover:text-pri'
				>
					Xem thêm <FontAwesomeIcon icon={faArrowRight} />
				</a>
			</div>
			<div className='flex items-center gap-8 overflow-x-scroll py-4'>
				{brandsLogo.map((brand, index) => (
					<a
						href='#!'
						key={index}
						className='w-[20rem] h-auto block flex-shrink-0'
					>
						<img
							src={brand}
							alt={`Brand ${index}`}
						/>
					</a>
				))}
			</div>
		</section>
	)
}

export default BrandList
