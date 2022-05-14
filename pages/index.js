import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const { mainPosts, loadPostsLoading } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch({
			type: LOAD_POSTS_REQUEST,
		});
	}, []);

	useEffect(() => {
		function onScroll() {
			console.log(
				window.scrollY,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight
			);
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
			<AppLayout>
				{me && <PostForm />}
				{!me && <div>로그인하면 보여줄게~</div>}
				{mainPosts.map((v) => {
					return <PostCard key={v.id} post={v} />;
				})}
			</AppLayout>
		</>
	);
};

export default Home;
