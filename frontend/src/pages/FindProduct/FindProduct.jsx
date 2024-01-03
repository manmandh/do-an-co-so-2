// import React, { useState } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import Carts from '~/components/Cart/Carts'

const FindProduct = () => {
	const [products, setProducts] = useState([])
	// const [loading, setLoading] = useState({ redering: true })
	const params = useParams()
	const product = params.product.trim()

	useEffect(() => {
		axios
			.get(`http://localhost:5000/products/search`, {
				params: { search: product },
			})
			.then((res) => setProducts(res.data.products))
			.catch((err) => toast.error(err))
	}, [product])

	return (
		<section className='bg-white p-8'>
			<h1 className='ss-title py-4 text-xxl font-bold mt-[5rem]'>
				Có {products.length} kết quả tìm kiếm của: "{product}"
			</h1>
			<div className=''>
				<Carts cartList={products} />
			</div>
		</section>
	)
}

export default FindProduct
