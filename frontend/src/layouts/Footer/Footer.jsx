import React from 'react'
import { Link } from 'react-router-dom'

import logo from '~/assets/images/logo.jpg'

import './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../components/Button/Button'

import {
	faFacebook,
	faGoogle,
	faInstagram,
	faTwitter,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer-wrapper'>
				<section className='footer-main'>
					<div className='footer-main-block'>
						<h4 className='footer-main-title'>Thông tin liên hệ</h4>
						<div className='footer-main-item'>
							<h5 className='footer-item-name'>Tên công ty</h5>
							<p className='footer-item-desc'>Công ty TNHH NTD</p>
						</div>
						<div className='footer-main-item'>
							<h5 className='footer-item-name'>Địa chỉ</h5>
							<p className='footer-item-desc'>Tòa nhà Cao Trọc Trời</p>
						</div>
						<div className='footer-main-item'>
							<h5 className='footer-item-name'>Email</h5>
							<p className='footer-item-desc'>ngodat02012004@gmail.com</p>
						</div>
						<div className='footer-main-item'>
							<h5 className='footer-item-name'>Hotline</h5>
							<p className='footer-item-desc'>09050 nằm 0 thích</p>
						</div>
						<div className='footer-main-item'>
							<h5 className='footer-item-name'>Thời gian hỗ trợ</h5>
							<p className='footer-item-desc'>Đến khi nào die thì thôi!</p>
						</div>
					</div>
					<div className='footer-main-block'>
						<h4 className='footer-main-title'>Hướng dẫn</h4>
						<Link
							to={'/'}
							className='footer-item-desc'
						>
							Trang chủ
						</Link>
						<Link
							to={'/introduce'}
							className='footer-item-desc'
						>
							Giới thiệu
						</Link>
						<Link
							to={'products'}
							className='footer-item-desc'
						>
							Sản phẩm
						</Link>
						<Link
							to={'/favorites'}
							className='footer-item-desc'
						>
							Yêu thích
						</Link>
						<Link
							to={'/contact'}
							className='footer-item-desc'
						>
							Liên hệ
						</Link>
						<Link
							to={'/news'}
							className='footer-item-desc'
						>
							Tin tức
						</Link>
					</div>
					<div className='footer-main-block'>
						<h4 className='footer-main-title'>Chăm sóc khách hàng</h4>
						<Link
							to={'/questions'}
							className='footer-item-desc'
						>
							Các câu hỏi thường gặp
						</Link>
						<Link
							to={'/support'}
							className='footer-item-desc'
						>
							Gửi yêu cầu hỗ trợ
						</Link>
						<Link
							to={''}
							className='footer-item-desc'
						>
							Đặt hàng online
						</Link>
						<Link
							to={'/shipping-method'}
							className='footer-item-desc'
						>
							Phương thức vận chuyển
						</Link>
						<Link
							to={'/refund-order'}
							className='footer-item-desc'
						>
							Hoàn trả đơn hàng
						</Link>
						<Link
							to={'/policy'}
							className='footer-item-desc'
						>
							Chính sách kiểm hàng
						</Link>
					</div>
					<div className='footer-main-block'>
						<h4 className='footer-main-title'>Kết nối</h4>
						<div className='footer-socials'>
							<FontAwesomeIcon icon={faFacebook} />
							<FontAwesomeIcon icon={faYoutube} />
							<FontAwesomeIcon icon={faTwitter} />
							<FontAwesomeIcon icon={faInstagram} />
							<FontAwesomeIcon icon={faGoogle} />
						</div>
						<h4 className='footer-item-title'>Tải ứng dụng NTD</h4>
						<div className='footer-download'>
							<Button
								href='https://apps.apple.com/vn/app/apple-store/id375380948?l=vi'
								outline
								md
							>
								App Store
							</Button>
							<Button
								href='https://play.google.com/store/games'
								outline
								md
							>
								Google Play
							</Button>
						</div>
					</div>
				</section>
				<section className='footer-bottom'>
					<span>
						@ Bản quyền thuộc về ND Theme | Cung cấp bởi{' '}
						<Link
							to={'#!'}
							className='dm'
						>
							DM
						</Link>
					</span>
					<img
						src={logo}
						alt='MCart'
						className='footer-logo'
					/>
				</section>
			</div>
		</footer>
	)
}

export default Footer
