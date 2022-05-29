import React, { memo, useEffect } from 'react';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import AppLayout from '../components/AppLayout';
import { useSelector } from 'react-redux';
// import { Router } from 'next/dist/client/router';
import Router from 'next/router';

const Profile = () => {
	const { me } = useSelector((state) => state.user);

	useEffect(() => {
		if (!(me && me.id)) {
			Router.push('/');
		}
	}, []);

	// if (!me) {
	// 	Router.push('/');
	// 	return null;
	// }

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
				<FollowList header="팔로워 목록" data={me.Followings} />
				<FollowList header="팔로잉 목록" data={me.Followers} />
			</AppLayout>
		</>
	);
};

export default Profile;
