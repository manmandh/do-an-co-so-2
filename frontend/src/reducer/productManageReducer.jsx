export const productManageActions = {
	CHANGE_NAME: 'product-change-name',
	CHANGE_PRICE: 'product-change-price',
	CHANGE_CATEGORY: 'product-change-category',
	CHANGE_BRAND: 'product-change-brand',
	CHANGE_QUANTITY: 'product-change-quantity',
	CHANGE_SPECIFICATIONS: 'product-change-specifications',
	CHANGE_DESCRIPTIONS: 'product-change-descriptions',
	CLEAR_DATA: 'product-clear-data',
}

export const productManageInitial = {
	name: '',
	price: 0,
	category: '',
	brand: '',
	quantity: '',
	specifications: [],
	desc: '',
}

export const productManageReducer = (reducer, action) => {
	switch (action.type) {
		case productManageActions.CHANGE_NAME: {
			return {
				...reducer,
				name: action.payload,
			}
		}
		case productManageActions.CHANGE_PRICE: {
			console.log(+action.payload)
			return {
				...reducer,
				price: +action.payload,
			}
		}
		case productManageActions.CHANGE_CATEGORY: {
			return {
				...reducer,
				category: action.payload,
			}
		}
		case productManageActions.CHANGE_BRAND: {
			return {
				...reducer,
				brand: action.payload,
			}
		}
		case productManageActions.CHANGE_QUANTITY: {
			return {
				...reducer,
				quantity: +action.payload,
			}
		}
		case productManageActions.CHANGE_SPECIFICATIONS: {
			return {
				...reducer,
				specifications: action.payload,
			}
		}
		case productManageActions.CHANGE_DESCRIPTIONS: {
			return {
				...reducer,
				desc: action.payload,
			}
		}
		case productManageActions.CLEAR_DATA: {
			return {
				name: '',
				price: 0,
				category: '',
				brand: '',
				quantity: '',
				specifications: [],
				desc: '',
			}
		}
		default:
			return reducer
	}
}
