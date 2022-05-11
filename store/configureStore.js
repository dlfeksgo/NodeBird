import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

// const middlewares = [sagaMiddleware];

const createStore = () => {
	const middlewares = [];
	const sagaMiddleware = createSagaMiddleware();
	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares))
			: composeWithDevTools(applyMiddleware(...middlewares));
	const store = configureStore({
		reducer: rootReducer,
		enhancer: enhancer,
		middleware: [sagaMiddleware],
	});
	store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

const wrapper = createWrapper(createStore, {
	debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
