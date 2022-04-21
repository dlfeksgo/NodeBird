import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from '../reducers';

const createStore = () => {
	const store = configureStore({
		reducer: rootReducer,
	});
	return store;
};

const wrapper = createWrapper(createStore, {
	debug: prrocess.env.NODE_ENV === 'development',
});

export default wrapper;
