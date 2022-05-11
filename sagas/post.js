import { all, fork, call, put, delay, takeLatest } from 'redux-saga/effects';
import shortid from 'shortid';
import {
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

export default function* postSaga(action) {
	function* addPost(action) {
		yield delay(1000);
		try {
			const id = shortid.generate();
			yield put({
				type: ADD_POST_SUCCESS,
				data: {
					id: id,
					content: action.data,
				},
			});
			yield put({
				type: ADD_POST_TO_ME,
				data: id,
			});
		} catch (err) {
			yield put({
				type: ADD_POST_FAILURE,
				error: err.response.data,
			});
		}
	}

	function* removePost(action) {
		yield delay(1000);
		try {
			yield put({
				type: REMOVE_POST_SUCCESS,
				data: action.data,
			});
			yield put({
				type: REMOVE_POST_OF_ME,
				data: action.data,
			});
		} catch (err) {
			yield put({
				type: REMOVE_POST_FAILURE,
				error: err.response.data,
			});
		}
	}

	function* addComment(action) {
		//content, postId, userId
		yield delay(1000);
		try {
			yield put({
				type: ADD_COMMENT_SUCCESS,
				data: action.data,
			});
		} catch (err) {
			yield put({
				type: ADD_COMMENT_FAILURE,
				error: err.response.data,
			});
		}
	}

	function* watchAddPost() {
		yield takeLatest(ADD_POST_REQUEST, addPost);
	}

	function* watchRemovePost() {
		yield takeLatest(REMOVE_POST_REQUEST, removePost);
	}

	function* watchAddComment() {
		yield takeLatest(ADD_COMMENT_REQUEST, addComment);
	}

	yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
