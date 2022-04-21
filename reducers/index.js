const initialState = {
	user: {
		isLoggedIn: false,
		user: null,
		signUpData: {},
		loginData: {},
	},
	post: {
		mainPost: [],
	},
};

const loginAction = (data) => {
	return {
		type: 'LOG_IN',
		data,
	};
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOG_IN':
			return {
				...state,
				user: {
					...state.user,
					isLoggedIn: true,
					user: action.data,
				},
			};
	}
};

export default rootReducer;
