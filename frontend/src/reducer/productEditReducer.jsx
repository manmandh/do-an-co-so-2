export const productEditActions = {
	CHANGE_NAME: 'change-name',
	CHANGE_PRICE: 'change-price',
	CHANGE_CATEGORY: 'change-category',
	CHANGE_BRAND: 'change-brand',
	CLEAR_EDIT: 'clear-edit',
}

export const productEditInitital = {
	nameEdit: '',
	priceEdit: 0,
	category: '',
	brand: '',
}

const productEditReducer = (reducer, action) => {
	switch (action.type) {
		case productEditActions.CHANGE_NAME: {
			return {
				...reducer,
				nameEdit: action.payload,
			}
		}
		case productEditActions.CHANGE_PRICE: {
			return {
				...reducer,
				priceEdit: action.payload,
			}
		}
		case productEditActions.CHANGE_CATEGORY: {
			return {
				...reducer,
				category: action.payload,
			}
		}
		case productEditActions.CHANGE_BRAND: {
			return {
				...reducer,
				brand: action.payload,
			}
		}
		case productEditActions.CLEAR_EDIT: {
			return {
				...reducer,
				nameEdit: '',
				price: 0,
				category: '',
				brand: '',
			}
		}
		default: {
			return reducer
		}
	}
}

export default productEditReducer
