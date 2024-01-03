import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '~/context/DataContext'

const columns = [
	{ field: 'id', headerName: 'ID' },
	{
		field: 'username',
		headerName: 'Username',
		width: 250,
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 400,
	},
	{
		field: 'address',
		headerName: 'Address',
		width: 500,
	},
	{
		field: 'role',
		headerName: 'Role',
		width: 100,
	},
]

const UserAccount = ({ icon }) => {
	const { database } = useContext(DataContext)
	const [rows, setRow] = useState(
		database.users.map((item, index) => {
			return {
				...item,
				id: index,
				role: item.isAdmin ? 'admin' : 'user',
			}
		})
	)

	const handleUpdateRows = (newRows, oldRows) => {
		console.log(newRows)
		console.log(oldRows)
	}

	useEffect(() => {
		if (!database.users && !database.users.length) {
			axios
				.get('http://localhost:5000/user/getall', {
					// headers: {
					// 	token: `Bearer ${currUser.accessToken}`,
					// },
				})
				.then((users) => {
					setRow(
						users.map((item, index) => {
							return { ...item, id: index }
						})
					)
				})
		}
	}, [database.users, rows])

	return (
		<div>
			<h3 className='flex items-center gap-4 text-5xl'>
				{icon}
				<span className='text-gray'>Tài khoản người dùng</span>
			</h3>
			<div className='h-[40rem] w-full mt-[5rem]'>
				<ThemeProvider theme={createTheme({ typography: { fontSize: 25 } })}>
					<DataGrid
						rows={rows}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						pageSizeOptions={[5, 10, 15, 20, 25, 30]}
						style={{ fontSize: '1.6rem' }}
						processRowUpdate={handleUpdateRows}
						onCellClick={(e) => console.log(e.value)}
						onRowSelectionModelChange={(e) => console.log}
					/>
				</ThemeProvider>
			</div>
		</div>
	)
}

export default UserAccount
