import React from 'react'

import style from './Contact.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../components/Button/Button'

import {
	faEnvelope,
	faLocationDot,
	faPhone,
} from '@fortawesome/free-solid-svg-icons'

const Contact = () => {
	return (
		<section className={style.contact}>
			<div className={style.wrapper}>
				<div>
					<h4 className={style.logo}>MCart</h4>
					<article className={style.info}>
						<div className={style.item}>
							<h4 className={style.name}>
								<FontAwesomeIcon icon={faLocationDot} />
								Địa chỉ:
							</h4>
							<p className={style.desc}>Tòa nhà Cao Trọc Trời</p>
						</div>
						<div className={style.item}>
							<h4 className={style.name}>
								<FontAwesomeIcon icon={faEnvelope} />
								Email:
							</h4>
							<p className={style.desc}>ngodat02012004@gmail.com</p>
						</div>
						<div className={style.item}>
							<h4 className={style.name}>
								<FontAwesomeIcon icon={faPhone} />
								Hotline:
							</h4>
							<p className={style.desc}>09050 nằm 0 thích</p>
						</div>
					</article>
					<h1 className={style.heading}>Liên hệ với chúng tôi </h1>
					<form className={style.form}>
						<input
							type='text'
							placeholder='Họ và tên'
						/>
						<input
							type='text'
							placeholder='Email'
						/>
						<input
							type='text'
							placeholder='Điện thoại'
						/>
						<textarea
							rows='10'
							className={style.textarea}
							placeholder='Nội dung'
						></textarea>
						<Button
							outline
							lg
						>
							Gửi thông tin
						</Button>
					</form>
				</div>
				<div>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12441.43250523682!2d108.22357734095255!3d15.940404173619745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1700538957711!5m2!1svi!2s'
						style={{ border: '0' }}
						allowFullScreen={true}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
						title='map'
						className={style.map}
					></iframe>
				</div>
			</div>
		</section>
	)
}

export default Contact
