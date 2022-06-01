import React, { useCallback, useState } from 'react';
import { Button, Card, Popover, Avatar, List } from 'antd';
import {
	RetweetOutlined,
	HeartOutlined,
	MessageOutlined,
	EllipsisOutlined,
	HeartTwoTone,
	MessageTwoTone,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CommentForm from './CommentForm';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import {
	LIKE_POST_REQUEST,
	REMOVE_POST_REQUEST,
	UNLIKE_POST_REQUEST,
} from '../reducers/post';
import { FOLLOW_REQUEST } from '../reducers/user';

const CardWrapper = styled.div`
	margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const { removePostLoading } = useSelector((state) => state.post);
	const id = me?.id;
	const liked = post.Likers?.find((v) => v.id === id);

	// const [liked, setLiked] = useState(false);
	// const likedToggle = useCallback(() => {
	// 	setLiked((prev) => !prev);
	// }, []);

	const onLike = useCallback(() => {
		dispatch({
			type: LIKE_POST_REQUEST,
			data: post.id,
		});
	}, []);
	const onUnLike = useCallback(() => {
		dispatch({
			type: UNLIKE_POST_REQUEST,
			data: post.id,
		});
	}, []);

	const onRemovePost = useCallback(() => {
		dispatch({
			type: REMOVE_POST_REQUEST,
			data: post.id,
		});
	}, []);

	const [commentFormOpened, setCommentFormOpened] = useState(false);
	const commentToggle = useCallback(() => {
		setCommentFormOpened((prev) => !prev);
	}, []);

	return (
		<CardWrapper>
			<Card
				extra={id && <FollowButton post={post} />}
				cover={post.Images[0] && <PostImages images={post.Images} />}
				// cover={
				// 	<img
				// 		alt="example"
				// 		src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
				// 	/>
				// }
				actions={[
					<RetweetOutlined key="retweet" />,
					liked ? (
						<HeartTwoTone
							key="heart"
							twoToneColor="#eb2f96"
							onClick={onUnLike}
						/>
					) : (
						<HeartOutlined key="heart" onClick={onLike} />
					),
					<MessageOutlined key="comment" onClick={commentToggle} />,
					<Popover
						key="more"
						content={
							<Button.Group>
								{id && id === post.User?.id ? (
									<>
										<Button>수정</Button>
										<Button
											type="danger"
											loading={removePostLoading}
											onClick={onRemovePost}
										>
											삭제
										</Button>
									</>
								) : (
									<Button>신고</Button>
								)}
							</Button.Group>
						}
					>
						<EllipsisOutlined key="ellipsis" />
					</Popover>,
				]}
			>
				<Card.Meta
					avatar={<Avatar>{post.User?.nickname[0]}</Avatar>} //post.User.nickname[0]
					title="Card title"
					description={<PostCardContent postData={post.content} />}
				/>
			</Card>
			{commentFormOpened && (
				<>
					<CommentForm post={post} />
					<List
						itemLayout="horizontal"
						dataSource={post.Comments}
						renderItem={(item) => (
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
									title={item.User.nickname}
									description={item.content}
								/>
							</List.Item>
						)}
					/>
				</>
			)}
		</CardWrapper>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.string,
		Comments: PropTypes.arrayOf(PropTypes.object),
		Images: PropTypes.arrayOf(PropTypes.object),
		Likers: PropTypes.arrayOf(PropTypes.object),
	}),
};

export default PostCard;
