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

import Link from 'next/link';

import CommentForm from './CommentForm';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import {
	LIKE_POST_REQUEST,
	REMOVE_POST_REQUEST,
	RETWEET_REQUEST,
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
		if (!id) {
			return alert('로그인이 필요합니다.');
		}
		dispatch({
			type: LIKE_POST_REQUEST,
			data: post.id,
		});
	}, [id]);
	const onUnLike = useCallback(() => {
		if (!id) {
			return alert('로그인이 필요합니다.');
		}
		return dispatch({
			type: UNLIKE_POST_REQUEST,
			data: post.id,
		});
	}, [id]);

	const onRemovePost = useCallback(() => {
		if (!id) {
			return alert('로그인이 필요합니다.');
		}
		return dispatch({
			type: REMOVE_POST_REQUEST,
			data: post.id,
		});
	}, [id]);

	const onRetweet = useCallback(() => {
		if (!id) {
			return alert('로그인이 필요합니다.');
		}
		return dispatch({
			type: RETWEET_REQUEST,
			data: post.id,
		});
	}, [id]);

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
					<RetweetOutlined key="retweet" onClick={onRetweet} />,
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
				title={
					post.RetweetId ? `${post.User.nickname}님이 리트윗 했습니다.` : null
				}
			>
				{post.RetweetId && post.Retweet ? (
					<Card
						cover={
							post.Retweet.Images[0] && (
								<PostImages images={post.Retweet.Images} />
							)
						}
					>
						<Card.Meta
							avatar={
								<Link href={`/user/${post.Retweet.User.id}`}>
									<a>
										<Avatar>{post.Retweet.User?.nickname[0]}</Avatar>
									</a>
								</Link>
							}
							title={post.Retweet.User.nickname}
							description={<PostCardContent postData={post.Retweet.content} />}
						/>
					</Card>
				) : (
					<Card.Meta
						avatar={
							<Link href={`/user/${post.User.id}`}>
								<a>
									<Avatar>{post.User?.nickname[0]}</Avatar>
								</a>
							</Link>
						} //post.User.nickname[0]
						title={post.User?.nickname}
						description={<PostCardContent postData={post.content} />}
					/>
				)}
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
									avatar={
										<Link href={`/user/${item.User.id}`}>
											<a>
												<Avatar>{item.User.nickname[0]}</Avatar>
											</a>
										</Link>
									}
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
