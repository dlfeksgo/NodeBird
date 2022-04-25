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
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import CommentForm from './CommentForm';

const CardWrapper = styled.div`
	margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
	const { me } = useSelector((state) => state.user);
	const id = me?.id;

	const [liked, setLiked] = useState(false);
	const likedToggle = useCallback(() => {
		setLiked((prev) => !prev);
	}, []);

	const [commentFormOpened, setCommentFormOpened] = useState(false);
	const commentToggle = useCallback(() => {
		setCommentFormOpened((prev) => !prev);
	}, []);

	return (
		<CardWrapper>
			<Card
				// style={{ width: 300 }}
				// cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined key="retweet" />,
					liked ? (
						<HeartTwoTone
							key="heart"
							twoToneColor="#eb2f96"
							onClick={likedToggle}
						/>
					) : (
						<HeartOutlined key="heart" onClick={likedToggle} />
					),
					<MessageOutlined key="comment" onClick={commentToggle} />,
					<Popover
						key="more"
						content={
							<Button.Group>
								{id && id === post.User.id ? (
									<>
										<Button>수정</Button>
										<Button type="danger">삭제</Button>
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
					avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
					title="Card title"
					description="첫 번째 게시글 #해시태그 #익스프레스"
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
		createdAt: PropTypes.object,
		Comments: PropTypes.arrayOf(PropTypes.any),
		Images: PropTypes.arrayOf(PropTypes.any),
	}),
};

export default PostCard;
