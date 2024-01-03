import React, { useState } from 'react'

const DynamicTable = ({ rows, columns }) => {
	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm text-left text-gray-500 text-gray-400'>
				<thead className=''>
					<tr>
						{columns?.map((col) => (
							<th
								scope='col'
								className='px-6 py-3'
							>
								Thông số
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows?.map((row, index) => (
						<tr
							className='bg-slate-300 border-b cursor-pointer even:bg-white'
							key={index}
						>
							<th
								scope='row'
								className='px-6 py-4 font-medium text-gray-900 hover:bg-red'
							>
								<input
									type='text'
									value={row.specName}
									className='w-full border-none'
								/>
							</th>
							<td className='px-6 py-4'>
								<input
									type='text'
									value={row.specValue}
									className='w-full border-none'
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default DynamicTable
