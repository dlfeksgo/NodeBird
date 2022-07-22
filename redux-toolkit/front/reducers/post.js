import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mainPosts: [],
	imagePaths: [],
	singlePost: null,
	hasMorePosts: true,
	likePostLoading: false,
	likePostDone: false,
	likePostError: null,
	unLikePostLoading: false,
	unLikePostDone: false,
	unLikePostError: null,
	loadPostLoading: false,
	loadPostDone: false,
	loadPostError: null,
	loadPostsLoading: false,
	loadPostsDone: false,
	loadPostsError: null,
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
	removePostLoading: false,
	removePostDone: false,
	removePostError: null,
	addCommentLoading: false,
	addCommentDone: false,
	addCommentError: null,
	uploadImagesLoading: false,
	uploadImagesDone: false,
	uploadImagesError: null,
	retweetLoading: false,
	retweetDone: false,
	retweetError: null,
};

export const addPost = (data) => {
	return {
		type: ADD_POST_REQUEST,
		data,
	};
};

const dummyPost = (data) => ({
	id: data.id,
	content: data.content,
	User: {
		id: 1,
		nickname: '제로초',
	},
	Images: [],
	Comments: [],
});

const dummyComment = (data) => ({
	id: shortid.generate(),
	User: {
		id: 1,
		nickname: 'nero',
	},
	content: data,
});

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		removeImages(state, action) {
			state.imagePaths = state.imagePaths.filter(
				(v, i) => i !== action.payload
			);
		},
	},
	extraReducers: {},
});

const reducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case REMOVE_IMAGES:
				draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
			case LOAD_POST_REQUEST:
				draft.loadPostLoading = true;
				draft.loadPostDone = false;
				draft.loadPostError = null;
				break;
			case LOAD_POST_SUCCESS:
				draft.singlePost = action.data;
				draft.loadPostLoading = false;
				draft.loadPostDone = true;
				break;

			case LOAD_POST_FAILURE:
				draft.loadPostLoading = false;
				draft.loadPostError = action.error;
				break;
			case LOAD_USER_POSTS_REQUEST:
			case LOAD_HASHTAG_POSTS_REQUEST:
			case LOAD_POSTS_REQUEST:
				draft.loadPostsLoading = true;
				draft.loadPostsDone = false;
				draft.loadPostsError = null;
				break;
			case LOAD_USER_POSTS_SUCCESS:
			case LOAD_HASHTAG_POSTS_SUCCESS:
			case LOAD_POSTS_SUCCESS:
				// draft.mainPosts = action.data.concat(draft.mainPosts);
				draft.mainPosts = draft.mainPosts.concat(action.data);
				draft.hasMorePosts = action.data.length === 10;
				draft.loadPostsLoading = false;
				draft.loadPostsDone = true;
				break;
			case LOAD_USER_POSTS_FAILURE:
			case LOAD_HASHTAG_POSTS_FAILURE:
			case LOAD_POSTS_FAILURE:
				draft.loadPostsLoading = false;
				draft.loadPostsError = action.error;
				break;
			case ADD_POST_REQUEST:
				draft.addPostLoading = true;
				draft.addPostDone = false;
				draft.addPostError = null;
				break;
			case ADD_POST_SUCCESS:
				// draft.mainPosts = [dummyPost(action.data), ...state.mainPosts];
				draft.mainPosts.unshift(action.data);
				draft.imagePaths = [];
				draft.addPostLoadin = false;
				draft.addPostDone = true;
				break;
			case ADD_POST_FAILURE:
				draft.addPostLoading = false;
				draft.addPostError = action.error;
				break;
			case REMOVE_POST_REQUEST:
				draft.removePostLoading = true;
				draft.removePostDone = false;
				draft.removePostError = null;
				break;
			case REMOVE_POST_SUCCESS:
				draft.mainPosts = state.mainPosts.filter(
					(v) => v.id !== action.data.PostId
				); //splice 써도 됨.
				draft.removePostLoading = false;
				draft.removePostDone = true;
				break;
			case REMOVE_POST_FAILURE:
				draft.removePostLoading = false;
				draft.removePostError = action.error;
				break;
			case UPLOAD_IMAGES_REQUEST:
				draft.uploadImagesLoading = true;
				draft.uploadImagesDone = false;
				draft.uploadImagesError = null;
				break;
			case UPLOAD_IMAGES_SUCCESS:
				draft.uploadImagesLoadin = false;
				draft.uploadImagesDone = true;
				draft.imagePaths = action.data; //업로드된 파일 이름들
				break;
			case UPLOAD_IMAGES_FAILURE:
				draft.uploadImagesLoading = false;
				draft.uploadImagesError = action.error;
				break;
			case ADD_COMMENT_REQUEST:
				draft.addCommentLoading = true;
				draft.addCommentDone = false;
				draft.addCommentError = null;
				break;
			case ADD_COMMENT_SUCCESS:
				console.log(action.data);
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
				post.Comments.unshift(action.data);
				draft.addCommentLoading = false;
				draft.addCommentDone = true;
				break;

			// //CommentForm > saga post.js에서 data: {content, postId, userId}
			// //댓글을 달려면 해당하는 게시물의 id를 알아야 접근할 수 있다.
			// const postIndex = state.mainPosts.findIndex(
			// 	(v) => v.id === action.data.postId
			// ); //현재 게시물 index 값
			// const post = state.mainPosts[postIndex]; //현재의 게시물 찾음 - 객체임
			// //게시물 안의 코멘트들 얕은 복사 후, 더미코멘트 추가
			// const Comments = [dummyComment(action.data.content), ...post.Comments];
			// const mainPosts = [...state.mainPosts]; //코멘트 얕은 복사됐으니까
			// mainPosts[postIndex] = { ...post, Comments }; //얕은 복사된 mainPosts 게시물에 게시물 복사 후 댓글 업데이트
			// return {
			// 	...state,
			// 	addCommentLoading: false,
			// 	addCommentDone: true,
			// };
			case ADD_COMMENT_FAILURE:
				draft.addCommentLoading = false;
				draft.addCommentError = action.error;
				break;
			case LIKE_POST_REQUEST:
				draft.likePostLoading = true;
				draft.likePostDone = false;
				draft.likePostError = null;
				break;
			case LIKE_POST_SUCCESS: {
				//action.data - PostId, UserID
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
				post.Likers.push({ id: action.data.UserId });
				draft.likePostLoading = false;
				draft.likePostDone = true;
				break;
			}
			case LIKE_POST_FAILURE:
				draft.likePostLoading = false;
				draft.likePostError = action.error;
				break;
			case UNLIKE_POST_REQUEST:
				draft.unLikePostLoading = true;
				draft.unLikePostDone = false;
				draft.unLikePostError = null;
				break;
			case UNLIKE_POST_SUCCESS: {
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
				post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
				draft.unLikePostLoading = false;
				draft.unLikePostDone = true;
				break;
			}
			case UNLIKE_POST_FAILURE:
				draft.unLikePostLoading = false;
				draft.unLikePostError = action.error;
				break;
			case RETWEET_REQUEST:
				draft.retweetLoading = true;
				draft.retweetDone = false;
				draft.retweetError = null;
				break;
			case RETWEET_SUCCESS: {
				draft.retweetLoading = false;
				draft.retweetDone = true;
				draft.mainPosts.unshift(action.data);
				break;
			}
			case RETWEET_FAILURE:
				draft.retweetLoading = false;
				draft.retweetError = action.error;
				break;
			default:
				// return state;
				break;
		}
	});
};

export default reducer;
