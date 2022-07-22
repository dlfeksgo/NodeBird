import React from 'react';
import { useSelector } from 'react-redux';
import wrapper from '../store/configureStore';

import { LOAD_USER_REQUEST } from '../reducers/user';
import { END } from 'redux-saga';

import Head from 'next/head';
import { Card, Avatar } from 'antd';
import AppLayout from '../components/AppLayout';

const Profile = () => {
	const { userInfo } = useSelector((state) => state.user);

	return (
		<>
			<AppLayout>
				<Head>
					<title>{userInfo.nickname} | NodeBird</title>
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
			</AppLayout>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async (context) => {
		context.store.dispatch({
			type: LOAD_USER_REQUEST,
			data: 1,
		});
		context.store.dispatch(END);
		await context.store.sagaTask.toPromise();
	}
);

export default Profile;
