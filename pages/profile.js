import React from 'react';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import AppLayout from '../components/AppLayout';

const Profile = () => {
	const followerList = [
		{ nickname: '희희' },
		{ nickname: '희희호호' },
		{ nickname: '어쩌구저쩌구' },
	];
	const followingList = [
		{ nickname: '희희4' },
		{ nickname: '희희호호' },
		{ nickname: '어쩌구저쩌구' },
	];

	return (
		<>
			<Head>
				<title>내 프로필 | NodeBird</title>
			</Head>
			<AppLayout>
				<NicknameEditForm />
				<FollowList header="팔로워 목록" data={followerList} />
				<FollowList header="팔로잉 목록" data={followingList} />
			</AppLayout>
		</>
	);
};

export default Profile;
