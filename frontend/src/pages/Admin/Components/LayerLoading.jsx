import React from 'react'
import { Loading } from '~/components'

const LayerLoading = ({ scale }) => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<Loading style={{ scale: scale }} />
		</div>
	)
}

export default LayerLoading
