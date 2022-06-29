import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { useInView } from 'react-intersection-observer';

import { END } from 'redux-saga';
import wrapper from '../store/configureStore';

const Home = () => {
	const dispatch = useDispatch();
	const [ref, inView] = useInView();
	const { me } = useSelector((state) => state.user);
	const { mainPosts, retweetError, hasMorePosts, loadPostsLoading } =
		useSelector((state) => state.post);

	useEffect(() => {
		if (retweetError) {
			alert(retweetError);
		}
	}, [retweetError]);

	useEffect(() => {
		dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		dispatch({
			type: LOAD_POSTS_REQUEST,
		});
	}, []);

	useEffect(() => {
		console.log(inView);
		if (inView && hasMorePosts && !loadPostsLoading) {
			const lastId = mainPosts[mainPosts.length - 1]?.id;
			dispatch({
				type: LOAD_POSTS_REQUEST,
				lastId,
			});
		}
	}, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

	// useEffect(() => {
	// 	function onScroll() {
	// 		// console.log(
	// 		// 	window.scrollY,
	// 		// 	document.documentElement.clientHeight,
	// 		// 	document.documentElement.scrollHeight
	// 		// );
	// 		if (
	// 			window.scrollY + document.documentElement.clientHeight >
	// 			document.documentElement.scrollHeight - 300
	// 		) {
	// 			if (!loadPostsLoading) {
	// 				dispatch({
	// 					type: LOAD_POSTS_REQUEST,
	// 				});
	// 			}
	// 		}
	// 	}
	// 	window.addEventListener('scroll', onScroll);
	// 	return () => {
	// 		window.removeEventListener('scroll', onScroll);
	// 	};
	// }, [mainPosts, loadPostsLoading]);

	return (
		<>
			<Head>
				<title>홈 | NodeBird</title>
			</Head>
			<AppLayout>
				{me && <PostForm />}
				{!me && <div>로그인하면 보여줄게~</div>}
				{mainPosts.map((v) => {
					return <PostCard key={v.id} post={v} />;
				})}
				<div
					style={{ height: '50px' }}
					ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
				/>
			</AppLayout>
		</>
	);
};

// export const getServerSideProps = wrapper.getServerSideProps(
// 	async (context) => {
// 		context.store.dispatch({
// 			type: LOAD_MY_INFO_REQUEST,
// 		});
// 		context.store.dispatch({
// 			type: LOAD_POSTS_REQUEST,
// 		});
// 		context.store.dispatch(END);
// 		await context.store.sagaTask.toPromise();
// 	}
// );

export default Home;
