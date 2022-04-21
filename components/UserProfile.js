import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
	const dispatch = useDispatch();
	const onLogOut = useCallback(() => {
		// setIsLoggedIn(false);
		dispatch(logoutAction());
	}, []);

	return (
		<Card
			actions={[
				<div key="twit">
					짹짹
					<br />0
				</div>,
				<div key="following">
					팔로잉
					<br />2
				</div>,
				<div key="follower">
					팔로워
					<br />3
				</div>,
			]}
		>
			<Card.Meta avatar={<Avatar>K</Avatar>} title="gmlgmlkim" />
			<Button onClick={onLogOut}>로그아웃</Button>
		</Card>
	);
};

export default UserProfile;
