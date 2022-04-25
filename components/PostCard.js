import React from 'react';
import { Button, Card, Popover, Avatar } from 'antd';
import {
	RetweetOutlined,
	HeartOutlined,
	MessageOutlined,
	EllipsisOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PostCard = ({ post }) => {
	const { me } = useSelector((state) => state.user);
	const id = me?.id;

	return (
		<Card
			// style={{ width: 300 }}
			// cover={post.Images[0] && <PostImages images={post.Images} />}
			actions={[
				<RetweetOutlined key="retweet" />,
				<HeartOutlined key="heart" />,
				<MessageOutlined key="comment" />,
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
				description="얍!"
			/>
		</Card>
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
