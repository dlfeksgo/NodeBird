import React from 'react';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

const Home = () => {
	const { isLoggedIn } = useSelector((state) => state.user);
	const { mainPosts } = useSelector((state) => state.post);

	return (
		<>
			<AppLayout>
				{isLoggedIn && <PostForm />}
				{!isLoggedIn && <div>로그인하면 보여줄게~</div>}
				{mainPosts.map((v) => {
					return <PostCard key={v.id} post={v} />;
				})}
			</AppLayout>
		</>
	);
};

export default Home;
