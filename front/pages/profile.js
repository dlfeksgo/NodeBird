import React, { memo, useEffect } from 'react';
import Head from 'next/head';

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

const Profile = () => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);

	useEffect(() => {
		if (!(me && me.id)) {
			Router.push('/');
		}
	}, []);

	useEffect(() => {
		dispatch({
			type: LOAD_FOLLOWERS_REQUEST,
		});
		dispatch({
			type: LOAD_FOLLOWINGS_REQUEST,
		});
	}, []);

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
				<FollowList header="팔로워 목록" data={me?.Followings} />
				<FollowList header="팔로잉 목록" data={me?.Followers} />
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
