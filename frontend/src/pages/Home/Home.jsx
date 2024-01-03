import React, { useEffect, useState } from 'react'
import Promotions from '../../components/Promotion/Promotions'
import { productList } from '../Product/Products'
import Banner from './Banner'
import BrandList from './BrandList'
import ProductList from './ProductList'
import axios from 'axios'
import { Products } from '~/pages/Product/Products'

const Home = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState({})

	useEffect(() => {
		axios
			.get('http://localhost:5000/products/getall')
			.then((res) => {
				// console.log(res.data.products)
				setProducts(res.data.products)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<>
			<Banner />
			<Promotions />
			<BrandList />
			<ProductList productList={products} />
		</>
	)
}

export default Home
