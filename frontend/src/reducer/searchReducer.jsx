const SEARCH_ACTIONS = {
	CHANGE_SEARCH_INPUT: 'search/change-input',
	CHANGE_PLACEHOLDER: 'searcg/change-placeholder',
	INCREASE_PLACEHOLDER_INDEX: 'search/increase-placeholder-index',
	DECREASE_PLACEHOLDER_INDEX: 'search/decrease-placeholder-index',
	CHANGE_CURRENT_PLACEHOLDER: 'search/change-current-placeoholder',
	CHANGE_DIRECTION: 'search/change-direction',
}

const searchInitials = {
	searchInput: '',
	placeholder: '',
	placeholderIndex: 0,
	currentPlaceholder: 0,
	toRight: true,
}

const searchReducer = (reducer, action) => {
	switch (action.type) {
		case SEARCH_ACTIONS.CHANGE_SEARCH_INPUT: {
			return {
				...reducer,
				searchInput: action.value,
			}
		}
		case SEARCH_ACTIONS.CHANGE_PLACEHOLDER: {
			return {
				...reducer,
				placeholder: action.value,
			}
		}
		case SEARCH_ACTIONS.INCREASE_PLACEHOLDER_INDEX: {
			return {
				...reducer,
				placeholderIndex: reducer.placeholderIndex + 1,
			}
		}
		case SEARCH_ACTIONS.DECREASE_PLACEHOLDER_INDEX: {
			return {
				...reducer,
				placeholderIndex: reducer.placeholderIndex - 1,
			}
		}
		case SEARCH_ACTIONS.CHANGE_CURRENT_PLACEHOLDER: {
			return {
				...reducer,
				currentPlaceholder: action.value,
			}
		}
		case SEARCH_ACTIONS.CHANGE_DIRECTION: {
			return {
				...reducer,
				toRight: action.value,
			}
		}
		default:
			return reducer
	}
}

export default searchReducer
export { searchInitials, SEARCH_ACTIONS }
