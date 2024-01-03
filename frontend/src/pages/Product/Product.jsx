import React, { useContext, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import './Product.scss'
import s from './Products.module.scss'
import Coupon from '../../components/Coupon/Coupon'
import CartNumberSelect from '../Cart/CartSelect/CartNumberSelect'
import Button from '../../components/Button/Button'
import {
	faArrowRightArrowLeft,
	faCheck,
	faShield,
	faTruck,
	faXmark,
} from '@fortawesome/free-solid-svg-icons'
import Option from './Components/Option'
import NewItem from './Components/NewItem'
import Carts from '../../components/Cart/Carts'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { convertToDom, formatMoneyTo } from '~/helper'
import LayerLoading from '../Admin/Components/LayerLoading'
import LazyImage from '../../components/LazyImage/LazyImage'
import useAuth from '~/hooks/useAuth'
import { ROLE } from '~/constants/constant'
import { AppContext } from '~/context/AppContext'

const Product = () => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [isOpen, setIsOpen] = useState(false)
	const [product, setProduct] = useState({})
	const [products, setProducts] = useState([])
	const [currentProduct, setCurrentProduct] = useState()
	const [relativeProducts, setRelativeProducts] = useState([])
	const [currentOption, setCurrentOption] = useState({})
	const [allOptions, setAllOptions] = useState({})
	const [loading, setLoading] = useState({
		rendering: false,
		changing: false,
	})
	const [quantity, setQuantity] = useState(1)
	const productId = useParams().productId
	const auth = useAuth()
	const navigate = useNavigate()
	const { setCartList } = useContext(AppContext)

	const handleAddCart = async () => {
		if (auth !== ROLE.User) {
			navigate('/auth')
			return
		}

		const data = {
			userId: JSON.parse(localStorage.getItem('user'))._id,
			productId,
			thumb: currentProduct.thumb.url,
			product_price: currentProduct.price,
			quantity,
			product_name: currentProduct.name,
		}

		try {
			const res = await axios.post(`http://localhost:5000/cart`, data)
			toast.success('Đã thêm vào giỏ hàng')
			setCartList((prev) => [...prev, res.data.newCart])
		} catch (err) {
			toast.error(err)
		}
	}

	const handleIncreaseQuantity = () => {
		if (quantity === currentProduct.quantity - currentProduct.sold) {
			toast.error('Vượt quá số lượng có trong kho')
			return
		}
		setQuantity((prev) => prev + 1)
	}

	const handleDecreaseQuantity = () => {
		if (quantity === 0) return
		setQuantity((prev) => prev - 1)
	}

	const handleChangeOption = (rootKey, value) => {
		setLoading((prev) => ({ ...prev, changing: true }))
		const option = { ...currentOption }
		option[rootKey] = value
		setCurrentOption(option)
		const updatedCurrentProduct = products.find((product) => {
			const cd = product.options.every((op, index) => {
				return op.optionValue === option[op.optionName]
			})
			return cd
		})
		setCurrentProduct(updatedCurrentProduct)
		product.img.shift()
		product.img.unshift(
			updatedCurrentProduct
				? updatedCurrentProduct.thumb
				: {
						publicId: '',
						url: 'https://res.cloudinary.com/dtxybpzwd/image/upload/v1703938326/shopcart/sold_out_fwmdh2.png',
				  }
		)
		setQuantity(1)
		setLoading((prev) => ({ ...prev, changing: false }))
	}

	const callApi = async () => {
		try {
			const product = (
				await axios.get(`http://localhost:5000/products/id/${productId}`)
			).data.product
			const products = product.products.map((pro) => ({ ...product, ...pro }))
			const relativeProducts = await (
				await axios.get(`http://localhost:5000/products/getall`, {
					params: {
						brand: product.brand,
					},
				})
			).data.products

			setProducts(products)
			setCurrentProduct({ ...product, ...product.products[0] })
			const options = {}
			products.forEach((product) => {
				product.options.forEach((option) => {
					if (options[option.optionName]) {
						options[option.optionName].add(option.optionValue)
					} else {
						const set = new Set()
						set.add(option.optionValue)
						options[option.optionName] = set
					}
				})
			})
			// convert Set to Array
			const currentOption = {}
			Object.keys(options).forEach((op) => {
				options[op] = [...options[op]]
				currentOption[op] = options[op][0]
			})
			setAllOptions(options)
			product.img.unshift(product.products[0].thumb)
			setCurrentOption(currentOption)
			setProduct(product)
			setRelativeProducts(relativeProducts)
		} catch (error) {}
	}

	useEffect(() => {
		setLoading({ changing: true, rendering: true })
		callApi()
		setLoading({ changing: false, rendering: false })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		document.title = product.name ?? 'ND Shop'
	}, [product])

	return (
		<section className='wrapper'>
			<div className='basic-info'>
				<div className='product-images flex flex-col gap-4'>
					{loading.changing ? (
						<LayerLoading />
					) : (
						<Swiper
							spaceBetween={10}
							navigation={true}
							thumbs={{
								swiper:
									thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
							}}
							modules={[FreeMode, Navigation, Thumbs]}
							className='mySwiper2'
						>
							{product?.img?.map((image, index) => (
								<SwiperSlide key={index}>
									<LazyImage
										src={image.url}
										alt={'product'}
										className={'main-image'}
									/>
									<FontAwesomeIcon
										icon={faHeart}
										className='favorite'
									/>
								</SwiperSlide>
							))}
						</Swiper>
					)}
					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={10}
						slidesPerView={4}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className='mySwiper'
					>
						{product?.img?.map((image, index) => (
							<SwiperSlide key={index}>
								{loading.changing ? (
									<LayerLoading />
								) : (
									<img
										src={image.url}
										alt='product'
										className='main-image'
										loading='lazy'
									/>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className='product-info'>
					<h1 className={s.productName}>{product.name}</h1>
					<div className={s.productId}>
						<span>Mã sản phẩm: </span>
						<span className={s.textHighLight}>{product?._id}</span>
					</div>
					<div className={s.brand}>
						<span>Thương hiệu: </span>
						<span className={s.textHighLight}>{product.brand}</span>
						<span className={s.line}> | </span>
						<span> Tình trạng: </span>
						<span className={s.textHighLight}>
							{currentProduct?.quantity ? (
								<span>
									Còn hàng <FontAwesomeIcon icon={faCheck} />
								</span>
							) : (
								<span>
									Hết hàng <FontAwesomeIcon icon={faXmark} />
								</span>
							)}
						</span>
					</div>
					{currentProduct?.quantity - currentProduct?.sold <= 10 && (
						<div className='text-pri text-sm'>
							Lượng hàng còn trong kho thâp
						</div>
					)}
					<div className={s.priceBox}>
						<span className={s.originPrice}>
							<b>
								{currentProduct?.sale?.percent
									? formatMoneyTo(
											(currentProduct.sale.percent * currentProduct.price) / 100
									  )
									: formatMoneyTo(currentProduct?.price)}
							</b>
						</span>
						<span className={s.secondPrice}>
							<b>
								{currentProduct?.sale?.percent
									? formatMoneyTo(currentProduct.price)
									: ''}
							</b>
						</span>
					</div>
					{currentProduct?.coupon && (
						<div className={s.saleId}>
							<b>Mã giảm giá</b>
							<div className={s.coupons}>
								<Coupon content='Giảm 50%' />
								<Coupon content='Giảm 15%' />
								<Coupon content='Giảm 10k' />
							</div>
						</div>
					)}
					{Object.keys(allOptions).map((optionName, outsideIndex) => (
						<div
							key={outsideIndex}
							className='flex flex-wrap items-center gap-8 mt-4'
						>
							<span>
								<b className='capitalize'>{optionName}: </b>
							</span>
							<div className={s.options}>
								{allOptions[optionName].map((option, insideIndex) => {
									return (
										<Option
											groupId={`option ${outsideIndex}`}
											defaultChecked={option === currentOption[optionName]}
											option={option}
											key={insideIndex}
											onChange={() => handleChangeOption(optionName, option)}
										/>
									)
								})}
							</div>
						</div>
					))}
					<div className='flex flex-wrap gap-8 items-center'>
						<b>Số lượng: </b>
						<CartNumberSelect
							size='md'
							quantities={quantity}
							onIncrease={handleIncreaseQuantity}
							onDecrease={handleDecreaseQuantity}
						/>
					</div>
					<div
						className={`${s.actions} border-t border-solid border-t-light-white pt-8`}
					>
						<Button
							bg
							xl
							onClick={handleAddCart}
						>
							Thêm vào giỏ hàng
						</Button>
						<Button
							outline
							xl
						>
							Mua ngay
						</Button>
					</div>
					<div className={s.benefitBox}>
						<h5 className={s.title}> Quyền lợi & chính sách: </h5>
						<div className={s.benefits}>
							<span className={s.benefit}>
								<span className={s.icon}>
									<FontAwesomeIcon icon={faArrowRightArrowLeft} />
								</span>
								<span>7 ngày hoàn trả miễn phí</span>
							</span>
							<span className={s.benefit}>
								<span className={s.icon}>
									<FontAwesomeIcon icon={faShield} />
								</span>
								<span>Hàng chính hãng</span>
							</span>
							<span className={s.benefit}>
								<span className={s.icon}>
									<FontAwesomeIcon icon={faTruck} />
								</span>
								<span>Miễn phí vận chuyển</span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className={`${s.detailsBox} flex flex-col gap-[2rem] md:flex-row`}>
				<div className={`${s.productInfo} flex-1 md:flex-[3]`}>
					<h3 className={s.title}>Thông tin sản phẩm</h3>
					<div className={s.details}>
						<div
							dangerouslySetInnerHTML={{
								__html: convertToDom(product.details ?? ''),
							}}
						></div>
					</div>
				</div>
				<div className={`${s.specifications} flex-1`}>
					<h3 className={s.title}>Thông số kỹ thuật</h3>
					<table className={`${s.table} ${isOpen ? s.open : ''}`}>
						<tbody className='w-full block'>
							{product?.specifications?.map((spec, index) => (
								<tr
									className={s.row}
									key={index}
								>
									<td className={s.cell}>{spec.specName}</td>
									<td className={`${s.cell} ${!isOpen && 'truncate'}`}>
										{spec.specValue}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Button
						bg
						full
						xl
						onClick={() => setIsOpen((open) => !open)}
					>
						{isOpen ? 'Thu gọn' : 'Xem thêm'}
					</Button>
					<div className={s.newsBox}>
						<h4 className={s.title}>Tin nổi bật</h4>
						<div className={`${s.news} flex flex-col gap-4`}>
							<NewItem img={'https://s.net.vn/HvMb'}>
								Xiaomi 13 đang được thử nghiệm MIUI 15 ổn định dựa trên Android
								14Xiaomi 13 đang được thử nghiệm MIUI 15 ổn định dựa trên
								Android 14Xiaomi 13 đang
							</NewItem>
							<NewItem img={'https://s.net.vn/4Fwf'}>
								Apple Pencil 3 khả năng có cơ chế thay ngòi cùng với tính năng
								hoàn toàn mới
							</NewItem>
							<NewItem img={'https://s.net.vn/QA5q'}>
								Tư vấn chọn mua laptop HP hỗ trợ tác vụ học tập văn phòng cơ bản
								bán chạy tại TGDĐ
							</NewItem>
							<NewItem img={'https://s.net.vn/qEsv'}>
								Apple dự kiến sẽ sớm đưa một công cụ mạnh mẽ tích hợp AI lên App
								Store
							</NewItem>
							<NewItem img={'https://s.net.vn/kuRF'}>
								Tầm giá 1 triệu, rinh ngay combo tai nghe + loa này, chất lượng
								khỏi bàn, chill nhạc miễn chê Tầm giá 1 triệu, rinh ngay combo
								tai nghe + loa này, chất lượng khỏi bàn, chill nhạc miễn chê
							</NewItem>
						</div>
					</div>
				</div>
			</div>
			<div className={`${s.moreProducts} mt-8`}>
				<h4 className={`${s.title}`}>Sản phẩm liên quan</h4>
				<div className={`${s.products}`}>
					<Carts
						cartList={relativeProducts}
						scroll
					/>
				</div>
			</div>
		</section>
	)
}

export default Product
