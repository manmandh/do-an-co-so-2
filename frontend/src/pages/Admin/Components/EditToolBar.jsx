import { Button } from '@mui/material'
import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import { HorizontalRule } from '@mui/icons-material'
import { useState } from 'react'

function EditToolbar(props) {
	const { setRows, setRowModesModel } = props
	const [disable, setDisable] = useState(true)

	const handleAdd = () => {
		const id = Math.floor(Math.random() * 1000)
		setDisable(false)
		setRows((oldRows) => {
			return [...oldRows, { id, name: '', value: '', isNew: true }]
		})
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
		}))
	}

	console.log('re-render')

	const handleMinus = () => {
		setRows((oldRows) => {
			if (oldRows.length === 1) setDisable(true)
			return oldRows.length ? oldRows.slice(0, oldRows.length - 1) : []
		})
		// setRowModesModel((oldRows) =>
		// 	oldRows.length ? oldRows.slice(0, oldRows.length - 1) : []
		// )
	}

	return (
		<GridToolbarContainer>
			<Button
				color='primary'
				startIcon={<AddIcon />}
				onClick={handleAdd}
			>
				Add record
			</Button>
			<Button
				color='primary'
				startIcon={<HorizontalRule />}
				onClick={handleMinus}
				disabled={disable}
			>
				Delete record
			</Button>
		</GridToolbarContainer>
	)
}

export default EditToolbar
