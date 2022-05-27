import axios from 'axios';
import { all, fork, call, put, delay, takeLatest } from 'redux-saga/effects';
import shortid from 'shortid';
import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE,
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
	generateDummyPost,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

export default function* postSaga(action) {
	function* loadPosts(action) {
		yield delay(1000);
		try {
			yield put({
				type: LOAD_POSTS_SUCCESS,
				data: generateDummyPost(10),
			});
		} catch (err) {
			console.error(err);
			yield put({
				type: LOAD_POSTS_FAILURE,
				error: err.response.data,
			});
		}
	}

	function addPostAPI(data) {
		return axios.post('/post', data);
	}

	function* addPost(action) {
		try {
			const result = yield call(addPostAPI, action.data);
			// const id = shortid.generate();
			yield put({
				type: ADD_POST_SUCCESS,
				data: {
					// id: id,
					content: result.data,
				},
			});
			yield put({
				type: ADD_POST_TO_ME,
				data: result.data.id,
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

	function addCommentAPI(data) {
		return axios.post(`/post/${data.postId}/comment`, data);
	}

	function* addComment(action) {
		//content, postId, userId
		try {
			const result = yield call(addCommentAPI, action.data);
			yield put({
				type: ADD_COMMENT_SUCCESS,
				data: result.data,
			});
		} catch (err) {
			yield put({
				type: ADD_COMMENT_FAILURE,
				error: err.response.data,
			});
		}
	}

	function* watchLoadPost() {
		yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
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

	yield all([
		fork(watchLoadPost),
		fork(watchAddPost),
		fork(watchRemovePost),
		fork(watchAddComment),
	]);
}
