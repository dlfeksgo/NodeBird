import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';

import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios';

import Head from 'next/head';
import { useInView } from 'react-intersection-observer';

import PostCard from '../../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';

const Hashtag = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [ref, inView] = useInView();
	const { tag } = router.query;
	const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
		(state) => state.post
	);

	useEffect(() => {
		if (inView && hasMorePosts && !loadPostsLoading) {
			const lastId = mainPosts[mainPosts.length - 1]?.id;
			dispatch({
				type: LOAD_HASHTAG_POSTS_REQUEST,
				lastId,
				data: tag,
			});
		}
	}, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

	return (
		<>
			<AppLayout>
				<Head>
					<title>'{mainPosts[0].Hashtags[0].name}' 검색결과</title>
				</Head>
				{mainPosts.map((c) => (
					<PostCard key={c.id} post={c} />
				))}
				<div
					style={{ height: '50px' }}
					ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
				/>
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
			type: LOAD_HASHTAG_POSTS_REQUEST,
			data: context.params.tag,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default Hashtag;
