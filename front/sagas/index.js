import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';

export default function* rootSaga() {
	// function logInAPI(){}

	yield all([fork(userSaga), fork(postSaga)]);
}
