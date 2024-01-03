import React from 'react'
import Carts from '~/components/Cart/Carts'

const ProductList = ({ productList }) => {
	return (
		<div className='p-8 bg-white mt-[5rem]'>
			<div className='flex items-center ss-title py-4'>
				<h2 className='text-xl font-black'>Sản phẩm dành cho bạn hôm nay</h2>
			</div>
			<Carts cartList={productList} />
		</div>
	)
}

export default ProductList
