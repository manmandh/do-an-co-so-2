import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTurnUp } from '@fortawesome/free-solid-svg-icons'

import style from './ButtonScrollTop.module.scss'

const ButtonScrollTop = () => {
	const [active, setActive] = useState(false)

	const handleToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		window.onscroll = () => {
			if (window.scrollY > 300) setActive(true)
			else setActive(false)
		}
	})

	return (
		<button
			className={style.scroll.concat(' ', active ? style.active : '')}
			type='button'
			onClick={handleToTop}
		>
			<FontAwesomeIcon icon={faTurnUp}></FontAwesomeIcon>
		</button>
	)
}

export default ButtonScrollTop
