const AUTH_ACTION = {
	CHANGE_EMAIL_SIGNIN: 'signin/change-email',
	CHANGE_PASSWORD_SIGNIN: 'signin/change-pass',
	CHANGE_USERNAME_SIGNUP: 'signup/change-username',
	CHANGE_EMAIL_SIGNUP: 'signup/change-email',
	CHANGE_PASSWORD_SIGNUP: 'signup/change-pass',
	CHANGE_CONFIRM_SIGNUP: 'signin/change-confirm',
}

const initials = {
	username: '',
	emailSignUp: '',
	passwordSignUp: '',
	emailSignIn: '',
	passwordSignIn: '',
	confirm: '',
}

const authReducer = (state, action) => {
	switch (action.type) {
		case AUTH_ACTION.CHANGE_EMAIL_SIGNIN: {
			return {
				...state,
				emailSignIn: action.value,
			}
		}
		case AUTH_ACTION.CHANGE_PASSWORD_SIGNIN: {
			return {
				...state,
				passwordSignIn: action.value,
			}
		}
		case AUTH_ACTION.CHANGE_USERNAME_SIGNUP: {
			return {
				...state,
				username: action.value,
			}
		}
		case AUTH_ACTION.CHANGE_EMAIL_SIGNUP: {
			return {
				...state,
				emailSignUp: action.value,
			}
		}
		case AUTH_ACTION.CHANGE_PASSWORD_SIGNUP: {
			return {
				...state,
				passwordSignUp: action.value,
			}
		}
		case AUTH_ACTION.CHANGE_CONFIRM_SIGNUP: {
			return {
				...state,
				confirm: action.value,
			}
		}
		default:
			return state
	}
}

export default authReducer
export { AUTH_ACTION, initials }
