import React from 'react'
import { Link } from 'react-router-dom'

import style from './Button.module.scss'
import Loading from '../Loading/Loading'

const Button = ({
	to,
	href,
	children,
	passProps,
	type = 'button',
	outline,
	bg,
	primary,
	md,
	lg,
	xl,
	full,
	onClick,
	startIcon,
	endIcon,
	loading = {
		loading: false,
		width: '0.5rem',
		height: '0.5rem',
		border: '5px',
	},
}) => {
	let Component = 'button'

	let classes = [
		outline ? style.outline : '',
		bg ? style.bg : '',
		primary ? style.primary : '',
		md ? style.md : '',
		lg ? style.lg : '',
		xl ? style.xl : '',
		full ? style.full : '',
		startIcon || endIcon ? style.icon : '',
	].reduce((el, cur) => el.concat(' ', cur))

	const props = {
		onClick,
		...passProps,
	}

	if (to) {
		props.to = to
		Component = Link
	} else if (href) {
		props.href = href
		Component = 'a'
	}

	return (
		<Component
			type={type}
			className={`${classes} ${style.button}`}
			{...props}
		>
			{startIcon && startIcon}
			{loading.loading ? (
				<Loading
					width={loading.width}
					height={loading.height}
					border={loading.border}
				/>
			) : (
				children
			)}
			{endIcon && endIcon}
		</Component>
	)
}

export default Button
