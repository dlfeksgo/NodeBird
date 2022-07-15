import React, { memo, useEffect, useState, useCallback } from 'react';
import Head from 'next/head';

import useSWR from 'swr';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import AppLayout from '../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
// import { Router } from 'next/dist/client/router';
import Router from 'next/router';

import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

import {
	LOAD_MY_INFO_REQUEST,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user';

const fetcher = (url) =>
	axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
	const dispatch = useDispatch();
	const [followersLimit, setFollowersLimit] = useState(3);
	const [followingsLimit, setFollowingsLimit] = useState(3);
	const { me } = useSelector((state) => state.user);

	const { data: followersData, error: followerError } = useSWR(
		`http://localhost:3065/user/followers?limit=${followersLimit}`,
		fetcher
	);
	const { data: followingsData, error: followingError } = useSWR(
		`http://localhost:3065/user/followings?limit=${followingsLimit}`,
		fetcher
	);

	useEffect(() => {
		if (!(me && me.id)) {
			Router.push('/');
		}
	}, []);

	const loadMoreFollowers = useCallback(() => {
		setFollowersLimit((prev) => prev + 3);
	}, []);
	const loadMoreFollowings = useCallback(() => {
		setFollowingsLimit((prev) => prev + 3);
	}, []);

	if (followerError || followingError) {
		console.error(followerError || followingError);
		return '팔로워/팔로잉 로딩 중 오류가 발생했습니다.';
	}

	// useEffect(() => {
	// 	dispatch({
	// 		type: LOAD_FOLLOWERS_REQUEST,
	// 	});
	// 	dispatch({
	// 		type: LOAD_FOLLOWINGS_REQUEST,
	// 	});
	// }, []);

	// const followerList = [
	// 	{ nickname: '희희' },
	// 	{ nickname: '희희호호' },
	// 	{ nickname: '어쩌구저쩌구' },
	// ];
	// const followingList = [
	// 	{ nickname: '희희4' },
	// 	{ nickname: '희희호호' },
	// 	{ nickname: '어쩌구저쩌구' },
	// ];

	return (
		<>
			<Head>
				<title>내 프로필 | NodeBird</title>
			</Head>
			<AppLayout>
				<NicknameEditForm />
				<FollowList
					header="팔로잉"
					data={followingsData}
					onClickMore={loadMoreFollowings}
					loading={!followingError && !followingsData}
				/>
				<FollowList
					header="팔로워"
					data={followersData}
					onClickMore={loadMoreFollowers}
					loading={!followerError && !followersData}
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
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default Profile;
