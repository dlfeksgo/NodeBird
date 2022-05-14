import React, { useCallback, useEffect } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
	const dispatch = useDispatch();
	const { me, followLoading, unfollowLoading } = useSelector(
		(state) => state.user
	);
	// const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
	const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

	const onClickButton = useCallback(() => {
		if (isFollowing) {
			dispatch({
				type: UNFOLLOW_REQUEST,
				data: post.User.id,
			});
		} else {
			dispatch({
				type: FOLLOW_REQUEST,
				data: post.User.id,
			});
		}
	}, [isFollowing]);

	// useEffect(() => {
	// 	console.log(isFollowing);
	// }, [isFollowing]);

	return (
		<>
			<Button
				loading={followLoading || unfollowLoading}
				onClick={onClickButton}
			>
				{isFollowing ? '언팔로우' : '팔로우'}
			</Button>
		</>
	);
};

FollowButton.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.object,
		Comments: PropTypes.arrayOf(PropTypes.any),
		Images: PropTypes.arrayOf(PropTypes.any),
	}),
};

export default FollowButton;
