import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { useInView } from 'react-intersection-observer';

const Home = () => {
	const dispatch = useDispatch();
	const [ref, inView] = useInView();
	const { me } = useSelector((state) => state.user);
	const { mainPosts, loadPostsLoading } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch({
			type: LOAD_POSTS_REQUEST,
		});
	}, []);

	// useEffect(() => {
	// 	console.log(inView);
	// 	// console.log(
	// 	// 	window.scrollY,
	// 	// 	document.documentElement.clientHeight,
	// 	// 	document.documentElement.scrollHeight
	// 	// );
	// 	if (inView && !loadPostsLoading) {
	// 		// const lastId = mainPosts[mainPosts.length - 1]?.id;
	// 		dispatch({
	// 			type: LOAD_POSTS_REQUEST,
	// 			// lastId,
	// 		});
	// 	}
	// }, [inView, loadPostsLoading, mainPosts]);

	useEffect(() => {
		function onScroll() {
			// console.log(
			// 	window.scrollY,
			// 	document.documentElement.clientHeight,
			// 	document.documentElement.scrollHeight
			// );
			if (
				window.scrollY + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 300
			) {
				if (!loadPostsLoading) {
					dispatch({
						type: LOAD_POSTS_REQUEST,
					});
				}
			}
		}
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [mainPosts, loadPostsLoading]);

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
				{/* <div ref={!loadPostsLoading ? ref : undefined} /> */}
			</AppLayout>
		</>
	);
};

export default Home;
