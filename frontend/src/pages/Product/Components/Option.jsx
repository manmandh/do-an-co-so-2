import React, { useState } from 'react'

import s from './Option.module.scss'

const Option = ({ defaultChecked = false, option = '', groupId, onChange }) => {
	const [checked, setChecked] = useState(defaultChecked)

	const handleOnchange = (e) => {
		onChange && onChange(e)
		setChecked(!checked)
	}

	return (
		<span className={s.option}>
			<input
				type='radio'
				id={option}
				name={groupId}
				hidden
				defaultChecked={checked}
				onChange={handleOnchange}
				className={s.input}
				value={option}
			/>
			<label
				htmlFor={option}
				className='capitalize'
			>
				{option}
			</label>
		</span>
	)
}

export default Option
