import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from './reducers';

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		getDefaultMiddleware().concat(logger);
	},
	devTools: process.env.NODE_ENV !== 'production',
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
const wrapper = createWrapper(store, {
	debug: process.env.NODE_ENV !== 'production',
});

export default wrapper;
