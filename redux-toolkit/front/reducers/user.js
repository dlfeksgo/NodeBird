import { createSlice } from '@reduxjs/toolkit';
import _remove from 'lodash/remove';
import {
	changeNickname,
	follow,
	loadMyInfo,
	loadUser,
	login,
	logout,
	removeFollow,
	signup,
	unfollow,
} from '../actions/user';

const initialState = {
	me: null,
	userInfo: null,
	loadMyInfoLoading: false,
	loadMyInfoDone: false,
	loadMyInfoError: null,
	loadUserLoading: false,
	loadUserDone: false,
	loadUserError: null,
	logInLoading: false,
	logInDone: false,
	logInError: null,
	logOutLoading: false,
	logOutDone: false,
	logOutError: null,
	signUpLoading: false,
	signUpDone: false,
	signUpError: null,
	followLoading: false,
	followDone: false,
	followError: null,
	changeNicknameLoading: false,
	changeNicknameDone: false,
	changeNicknameError: null,
	// unfollowLoading: false,
	// unfollowDone: false,
	// unfollowError: null,
	// loginData: {},
	// signUpData: {},
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addPostToMe(state, action) {
			state.me.Posts.unshift({ id: action.payload });
		},
		removePostToMe(state, action) {
			_remove(state.me.Posts, (v) => v.id === action.payload);
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(login.pending, (state) => {
				state.loginLoading = true;
				state.loginDone = false;
				state.loginError = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loginLoading = false;
				state.me = action.payload;
				state.loginDone = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.loginLoading = false;
				state.loginError = action.payload;
			})
			// logout
			.addCase(logout.pending, (state) => {
				state.logoutLoading = true;
				state.logoutDone = false;
				state.logoutError = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.logoutLoading = false;
				state.logoutDone = true;
				state.me = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.logoutLoading = false;
				state.logoutError = action.payload;
			})
			// signup
			.addCase(signup.pending, (state) => {
				state.signupLoading = true;
				state.signupDone = false;
				state.signupError = null;
			})
			.addCase(signup.fulfilled, (state) => {
				state.signupLoading = false;
				state.signupDone = true;
			})
			.addCase(signup.rejected, (state, action) => {
				state.signupLoading = false;
				state.signupError = action.payload;
			})
			// loadMyInfo
			.addCase(loadMyInfo.pending, (state) => {
				state.loadMyInfoLoading = true;
				state.loadMyInfoDone = false;
				state.loadMyInfoError = null;
			})
			.addCase(loadMyInfo.fulfilled, (state, action) => {
				state.loadMyInfoLoading = false;
				state.loadMyInfoDone = true;
				state.me = action.payload;
			})
			.addCase(loadMyInfo.rejected, (state, action) => {
				state.loadMyInfoLoading = false;
				state.loadMyInfoError = action.payload;
			})
			// loadUser
			.addCase(loadUser.pending, (state) => {
				state.loadUserLoading = true;
				state.loadUserDone = false;
				state.loadUserError = null;
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				state.loadUserLoading = false;
				state.loadUserDone = true;
				state.userInfo = action.payload;
			})
			.addCase(loadUser.rejected, (state, action) => {
				state.loadUserLoading = false;
				state.loadUserError = action.payload;
			})
			// changeNickname
			.addCase(changeNickname.pending, (state) => {
				state.changeNicknameLoading = true;
				state.changeNicknameDone = false;
				state.changeNicknameError = null;
			})
			.addCase(changeNickname.fulfilled, (state, action) => {
				state.changeNicknameLoading = false;
				state.changeNicknameDone = true;
				state.me.nickname = action.payload.nickname;
			})
			.addCase(changeNickname.rejected, (state, action) => {
				state.changeNicknameLoading = false;
				state.changeNicknameError = action.payload;
			})
			// follow
			.addCase(follow.pending, (state) => {
				state.followLoading = true;
				state.followDone = false;
				state.followError = null;
			})
			.addCase(follow.fulfilled, (state, action) => {
				state.followLoading = false;
				state.followDone = true;
				state.me.Followings.push({ id: action.payload.UserId });
			})
			.addCase(follow.rejected, (state, action) => {
				state.followLoading = false;
				state.followError = action.payload;
			})
			// unfollow
			.addCase(unfollow.pending, (state) => {
				state.followLoading = true;
				state.followDone = false;
				state.followError = null;
			})
			.addCase(unfollow.fulfilled, (state, action) => {
				state.followLoading = false;
				state.followDone = true;
				_remove(state.me.Followings, { id: action.payload.UserId });
			})
			.addCase(unfollow.rejected, (state, action) => {
				state.followLoading = false;
				state.followError = action.payload;
			})
			// removeFollow
			.addCase(removeFollow.pending, (state) => {
				state.followLoading = true;
				state.followDone = false;
				state.followError = null;
			})
			.addCase(removeFollow.fulfilled, (state, action) => {
				state.followLoading = false;
				state.followDone = true;
				_remove(state.me.Followers, { id: action.payload.UserId });
			})
			.addCase(removeFollow.rejected, (state, action) => {
				state.followLoading = false;
				state.followError = action.payload;
			})
			.addDefaultCase((state) => state),
});

export const loginRequestAction = (data) => {
	return {
		type: LOG_IN_REQUEST,
		data,
	};
};

export const logoutRequestAction = () => {
	return {
		type: LOG_OUT_REQUEST,
	};
};

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case LOAD_MY_INFO_REQUEST:
				draft.loadMyInfoLoading = true;
				draft.loadMyInfoDone = false;
				draft.loadMyInfoError = null;
				break;
			case LOAD_MY_INFO_SUCCESS:
				draft.loadMyInfoLoading = false;
				draft.loadMyInfoDone = true;
				draft.me = action.data;
				break;
			case LOAD_MY_INFO_FAILURE:
				draft.loadMyInfoLoading = false;
				draft.loadMyInfoError = action.error;
				break;
			case LOAD_USER_REQUEST:
				draft.loadUserLoading = true;
				draft.loadUserDone = false;
				draft.loadUserError = null;
				break;
			case LOAD_USER_SUCCESS:
				draft.loadUserLoading = false;
				draft.loadUserDone = true;
				draft.userInfo = action.data;
				break;
			case LOAD_USER_FAILURE:
				draft.loadUserLoading = false;
				draft.loadUserError = action.error;
				break;
			case LOAD_FOLLOWERS_REQUEST:
				draft.loadFollowersLoading = true;
				draft.loadFollowersDone = false;
				draft.loadFollowersError = null;
				break;
			case LOAD_FOLLOWERS_SUCCESS:
				draft.loadFollowersLoading = false;
				draft.loadFollowersDone = true;
				draft.me.Followers = action.data;
				break;
			case LOAD_FOLLOWERS_FAILURE:
				draft.loadFollowersLoading = false;
				draft.loadFollowersError = action.error;
				break;
			case LOAD_FOLLOWINGS_REQUEST:
				draft.loadFollowingsLoading = true;
				draft.loadFollowingsDone = false;
				draft.loadFollowingsError = null;
				break;
			case LOAD_FOLLOWINGS_SUCCESS:
				draft.loadFollowingsLoading = false;
				draft.loadFollowingsDone = true;
				draft.me.Followings = action.data;
				break;
			case LOAD_FOLLOWINGS_FAILURE:
				draft.loadFollowingsLoading = false;
				draft.loadFollowingsError = action.error;
				break;
			case LOG_IN_REQUEST:
				draft.logInLoading = true;
				draft.logInDone = false;
				draft.logInError = null;
				break;
			case LOG_IN_SUCCESS:
				draft.logInLoading = false;
				draft.logInDone = true;
				draft.me = action.data;
				break;
			case LOG_IN_FAILURE:
				draft.logInLoading = false;
				draft.logInError = action.error;
				break;
			case LOG_OUT_REQUEST:
				draft.logOutLoading = true;
				draft.logOutDone = false;
				break;
			case LOG_OUT_SUCCESS:
				draft.logOutLoading = false;
				draft.logOutDone = true;
				draft.me = null;
				break;
			case LOG_OUT_FAILURE:
				draft.logOutLoading = false;
				draft.logOutError = action.error;
				break;
			case SIGN_UP_REQUEST:
				draft.signUpLoading = true;
				draft.signUpDone = false;
				break;
			case SIGN_UP_SUCCESS:
				draft.signUpLoading = false;
				draft.signUpDone = true;
				break;
			case SIGN_UP_FAILURE:
				draft.signUpLoading = false;
				draft.signUpError = action.error;
				break;
			case CHANGE_NICKNAME_REQUEST:
				draft.changeNicknameLoading = true;
				draft.changeNicknameDone = false;
				break;
			case CHANGE_NICKNAME_SUCCESS:
				//action.data - nickname
				draft.me.nickname = action.data.nickname;
				draft.changeNicknameLoading = false;
				draft.changeNicknameDone = true;
				break;
			case CHANGE_NICKNAME_FAILURE:
				draft.changeNicknameLoading = false;
				draft.changeNicknameError = action.error;
				break;
			case FOLLOW_REQUEST:
				draft.followLoading = true;
				draft.followDone = false;
				draft.followError = null;
				break;
			case FOLLOW_SUCCESS:
				draft.followLoading = false;
				draft.followDone = true;
				// draft.me.Followings = draft.me.Followings.unshift(action.data) //객체로 넣어야 하는데..
				draft.me.Followings.push({ id: action.data.UserId });
				break;
			case FOLLOW_FAILURE:
				draft.followLoading = false;
				draft.followError = action.error;
				break;
			case UNFOLLOW_REQUEST:
				draft.unfollowLoading = true;
				draft.unfollowDone = false;
				draft.unfollowError = null;
				break;
			case UNFOLLOW_SUCCESS:
				draft.unfollowLoading = false;
				draft.unfollowDone = true;
				draft.me.Followings = draft.me.Followings.filter(
					(v) => v.id !== action.data.UserId
				);
				break;
			case UNFOLLOW_FAILURE:
				draft.unfollowLoading = false;
				draft.unfollowError = action.error;
				break;
			case ADD_POST_TO_ME:
				draft.me.Posts.unshift({ id: action.data });
				break;
			case REMOVE_POST_OF_ME:
				draft.me.Posts = draft.me.Posts.filter(
					(v) => v.id !== action.data.PostId
				);
				break;
			// return {
			// 	...state,
			// 	me: {
			// 		...state.me,
			// 		Posts: state.me.Posts.filter((v) => v.id !== action.data), //id가 일치하지 않는 것만 남기겠다.
			// 	},
			// };
			default:
				break;
		}
	});
};

export default reducer;
