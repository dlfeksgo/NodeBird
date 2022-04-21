import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

const createStore = () => {
	const middlewares = [];
	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares))
			: composeWithDevTools(applyMiddleware(...middlewares));
	const store = configureStore({
		reducer: rootReducer,
		enhancer: enhancer,
	});
	return store;
};

const wrapper = createWrapper(createStore, {
	debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
