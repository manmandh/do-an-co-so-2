import React from 'react'

import s from '../NotFound.module.scss'

const Clock = () => {
	return (
		<g
			id={s.clock}
			data-name='Layer 8'
		>
			<circle
				className={s.cls5}
				cx='847.7'
				cy='247.59'
				r='74.66'
				transform='translate(-32.91 314.05) rotate(-20.6)'
			/>
			<circle
				className={s.cls1}
				cx='847.7'
				cy='247.59'
				r='63.44'
				transform='translate(-32.91 314.05) rotate(-20.6)'
			/>
			<rect
				className={`${s.cls3} ${s.clockhand1}`}
				x='845'
				y='189.5'
				width='6.04'
				height='58'
				rx='3.02'
				ry='3.02'
			/>
			<rect
				className={`${s.cls3} ${s.clockhand2}`}
				x='845'
				y='209.5'
				width='6.04'
				height='38'
				rx='3.02'
				ry='3.02'
				transform='translate(1611.22 -230.4) rotate(130.4)'
			/>
			<circle
				className={s.cls3}
				cx='847.7'
				cy='247.59'
				transform='translate(-32.91 314.05) rotate(-20.6)'
				r='3'
			/>
		</g>
	)
}

export default Clock
