import React from 'react'

import s from './NotFound.module.scss'
import * as Component from './Components/index'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<div class={s.wrapper}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 1920 1080'
			>
				<Component.YellowBackFig />
				<Component.FourtyFour />
				<Component.Umbrella />
				<Component.Pillow />
				<Component.Cup />/
				<Component.Clock />
				<Component.Box />
				<Component.Rucksack />
				<Component.Bike />
			</svg>
			<div style={{ textAlign: 'center' }}>
				<Button
					outline
					xl
					onClick={() => navigate(-1)}
				>
					Quay lại
				</Button>
			</div>
		</div>
	)
}

export default NotFound
