import React, { useEffect, useState } from 'react'

import style from './Products.module.scss'
import Carts from '../../components/Cart/Carts'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Products = () => {
	const [phoneList, setPhoneList] = useState([])
	const [laptopList, setLaptopList] = useState([])
	const [tvList, setTvList] = useState([])

	useEffect(() => {
		Promise.allSettled([
			axios.get(`http://localhost:5000/products/getall`, {
				params: { category_name: 'điện thoại' },
			}),
			axios.get(`http://localhost:5000/products/getall`, {
				params: { category_name: 'laptop' },
			}),
			axios.get(`http://localhost:5000/products/getall`, {
				params: { category_name: 'tivi' },
			}),
		])
			.then(([phone, laptops, tv]) => {
				const phoneList = phone.value.data.products
				const laptopList = laptops.value.data.products
				const tvList = tv.value.data.products
				setPhoneList(phoneList)
				setLaptopList(laptopList)
				setTvList(tvList)
			})
			.catch((err) => toast.error(err))
	}, [])

	return (
		<section className={style.products}>
			<div className='mt-[5rem]'>
				<h2 className='font-bold text-5xl py-2 ss-title mt-[5rem]'>
					Điện thoại:
				</h2>
				<Carts cartList={phoneList} />
				{laptopList.length > 0 && (
					<>
						<h2 className='font-bold text-5xl py-2 ss-title mt-[5rem]'>
							Laptop:
						</h2>
						<Carts cartList={laptopList} />
					</>
				)}
				{tvList.length > 0 && (
					<>
						<h2 className='font-bold text-5xl py-2 ss-title mt-[5rem]'>
							Tivi:
						</h2>
						<Carts cartList={tvList} />
					</>
				)}
			</div>
		</section>
	)
}

export default Products
