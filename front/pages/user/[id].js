import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Card, Avatar } from 'antd';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { useInView } from 'react-intersection-observer';

import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import axios from 'axios';

import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';

const User = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { id } = router.query;
	const [ref, inView] = useInView();
	const { userInfo } = useSelector((state) => state.user);
	const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
		(state) => state.post
	);

	useEffect(() => {
		if (inView && hasMorePosts && !loadPostsLoading) {
			const lastId = mainPosts[mainPosts.length - 1]?.id;
			dispatch({
				type: LOAD_USER_POSTS_REQUEST,
				lastId,
				data: id,
			});
		}
	}, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

	return (
		<>
			<AppLayout>
				<Head>
					<title>
						{userInfo.nickname}
						님의 글
					</title>
					<meta
						name="description"
						content={`${userInfo.nickname}님의 게시글`}
					/>
					<meta
						property="og:title"
						content={`${userInfo.nickname}님의 게시글`}
					/>
					<meta
						property="og:description"
						content={`${userInfo.nickname}님의 게시글`}
					/>
					<meta
						property="og:image"
						content="https://nodebird.com/favicon.ico"
					/>
					<meta property="og:url" content={`https://nodebird.com/user/${id}`} />
				</Head>
				{userInfo ? (
					<Card
						actions={[
							<div key="twit">
								짹짹
								<br />
								{userInfo.Posts}
							</div>,
							<div key="following">
								팔로잉
								<br />
								{userInfo.Followings}
							</div>,
							<div key="follower">
								팔로워
								<br />
								{userInfo.Followers}
							</div>,
						]}
					>
						<Card.Meta
							avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
							title={userInfo.nickname}
						/>
					</Card>
				) : null}
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

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		const cookie = context.req ? context.req.headers.cookie : '';
		axios.defaults.headers.Cookie = '';
		if (context.req && cookie) {
			axios.defaults.headers.Cookie = cookie;
		}
		context.store.dispatch({
			type: LOAD_USER_POSTS_REQUEST,
			data: context.params.id,
		});
		context.store.dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
		context.store.dispatch({
			type: LOAD_USER_REQUEST,
			data: context.params.id,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default User;
