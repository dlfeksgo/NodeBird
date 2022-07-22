import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userSlice } from '../reducers/user';

export const loadPosts = createAsyncThunk(
	'post/loadPosts',
	async (data) => {
		const response = await axios.get(`/posts?lastId=${data?.lastId || 0}`);
		return response.data;
	},
	{
		condition: (data, { getState }) => {
			const { post } = getState();

			if (post.loadPostsLoading) {
				// console.warn('중복 요청 취소');
				return false;
			}
			return true;
		},
	}
);

//특정 id의 게시글 1개를 불러온다.
//받아오는 data안에 :postId가 있을 것
export const loadPost = createAsyncThunk(
	'post/loadPost',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/post/${data.postId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// user/유저id/posts
// pages > user > [id].js 에서 SSR때 사용된다.
export const loadUserPosts = createAsyncThunk(
	'post/loadUserPosts',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`/user/${data.userId}/posts?lastId=${data?.lastId || 0}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

//hashtag/:tag
export const loadHashtagPosts = createAsyncThunk(
	'post/loadHashtagPosts',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`/hashtag/${encodeURIComponent(data.hashtag)}?last=${data?.lastId || 0}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const addPost = createAsyncThunk(
	'post/addPost',
	async (data, thunkAPI) => {
		try {
			const response = await axios.post('/post', data);
			thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.id));
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const removePost = createAsyncThunk(
	'post/removePost',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/post/${data.postId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

//data는 컴포넌트에서 dispatch 될 때 받는 데이터를 말한다.
export const addComment = createAsyncThunk(
	'post/addComment',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/post/${data.postId}/comment`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const uploadImages = createAsyncThunk(
	'post/uploadImages',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/post/images`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

//data 없애보기
export const retweet = createAsyncThunk(
	'post/retweet',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/post/${data.postId}/retweet`, data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const likePost = createAsyncThunk(
	'post/likePost',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post(`/post/${data.postId}/like`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const unLikePost = createAsyncThunk(
	'post/unLikePost',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/post/${data.postId}/like`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
