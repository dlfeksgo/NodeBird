import { all, fork, call, put, delay, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
	LOG_IN_REQUEST,
	LOG_IN_SUCCESS,
	LOG_IN_FAILURE,
	LOG_OUT_REQUEST,
	LOG_OUT_SUCCESS,
	LOG_OUT_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	SIGN_UP_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	FOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
	UNFOLLOW_FAILURE,
} from '../reducers/user';

export default function* userSaga() {
	function signUpAPI(data) {
		return axios.post('/user', data); //백엔드 routes에서 받는다.
	}

	function* signUp(action) {
		try {
			const result = yield call(signUpAPI, action.data);
			console.log(result);
			yield put({
				type: SIGN_UP_SUCCESS,
			});
		} catch (err) {
			console.log(err);
			yield put({
				type: SIGN_UP_FAILURE,
				error: err.response.data,
			});
		}
	}

	function logInAPI(data) {
		return axios.post('/user/login', data); //백엔드 routes에서 받는다.
	}

	function* logIn(action) {
		try {
			const result = yield call(logInAPI, action.data);
			yield put({
				type: LOG_IN_SUCCESS,
				data: result.data,
			});
		} catch (err) {
			yield put({
				type: LOG_IN_FAILURE,
				error: err.response.data,
			});
		}
	}

	function logOutAPI(data) {
		return axios.post('/user/logout', data); //백엔드 routes에서 받는다.
	}

	function* logOut() {
		try {
			yield call(logOutAPI);
			yield put({
				type: LOG_OUT_SUCCESS,
			});
		} catch (err) {
			yield put({
				type: LOG_OUT_FAILURE,
				error: err.response.data,
			});
		}
	}

	function* follow(action) {
		// const result = yield call(logOutAPI)
		yield delay(1000);
		try {
			yield put({
				type: FOLLOW_SUCCESS,
				data: action.data, //post.User.id
			});
		} catch (err) {
			yield put({
				type: FOLLOW_FAILURE,
				error: err.response.data,
			});
		}
	}

	function* unfollow(action) {
		// const result = yield call(logOutAPI)
		yield delay(1000);
		try {
			yield put({
				type: UNFOLLOW_SUCCESS,
				data: action.data, //post.User.id
			});
		} catch (err) {
			yield put({
				type: UNFOLLOW_FAILURE,
				error: err.response.data,
			});
		}
	}

	function* watchSignUp() {
		yield takeLatest(SIGN_UP_REQUEST, signUp);
	}

	function* watchLogin() {
		yield takeLatest(LOG_IN_REQUEST, logIn);
	}

	function* watchLogOut() {
		yield takeLatest(LOG_OUT_REQUEST, logOut);
	}

	function* watchFollow() {
		yield takeLatest(FOLLOW_REQUEST, follow);
	}

	function* watchUnfollow() {
		yield takeLatest(UNFOLLOW_REQUEST, unfollow);
	}

	yield all([
		fork(watchLogin),
		fork(watchLogOut),
		fork(watchSignUp),
		fork(watchFollow),
		fork(watchUnfollow),
	]);
}
