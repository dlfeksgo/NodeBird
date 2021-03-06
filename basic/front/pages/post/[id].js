import React from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';

import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios';

import Head from 'next/head';

import PostCard from '../../components/PostCard';
import { useSelector } from 'react-redux';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';

const Post = () => {
	const router = useRouter();
	const { id } = router.query;
	const { singlePost } = useSelector((state) => state.post);
	return (
		<>
			<AppLayout>
				<Head>
					<title>{singlePost.User.nickname}님의 게시글입니다</title>
					<meta name="description" content={singlePost.content}></meta>
					<meta
						property="og:title"
						content={`${singlePost.content}님의 게시글`}
					></meta>
					<meta property="og:description" content={singlePost.content}></meta>
					<meta
						property="og:image"
						content={
							singlePost.Images[0]
								? singlePost.Images[0].src
								: 'https://nodebird.com/favicon.ico'
						}
					></meta>
					<meta
						property="og:url"
						content={`https://nodebird.com/post/${id}`}
					></meta>
				</Head>
				<PostCard post={singlePost} />
			</AppLayout>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		const cookie = context.req ? context.req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (context.req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		context.store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		context.store.dispatch({
			type: LOAD_POST_REQUEST,
			data: context.params.id,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default Post;
