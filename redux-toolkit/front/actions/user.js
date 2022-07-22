import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async () => {
	const response = await axios.get('/user');
	return response.data;
});

//data는 SSR로 받아온 userId: context.params.id
//rejectWithValue(error)로 해도 될 것 같은데...
export const loadUser = createAsyncThunk(
	'user/loadUser',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/user/${data.userId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post('/user/login', data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const logout = createAsyncThunk('user/logout', async () => {
	const response = await axios.post('/user/logout');
	return response.data;
});

export const signup = createAsyncThunk(
	'user/signup',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post('/user', data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const changeNickname = createAsyncThunk(
	'user/changeNickname',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.patch('/user/nickname', data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const follow = createAsyncThunk(
	'post/follow',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.patch(`/user/${data.userId}/following`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const unfollow = createAsyncThunk(
	'post/unfollow',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/user/${data.userId}/following`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const removeFollow = createAsyncThunk(
	'post/removeFollow',
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/user/${data.userId}/follower`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
