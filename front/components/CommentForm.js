import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { createGlobalStyle } from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ADD_COMMENT_REQUEST } from '../reducers/post';

const Global = createGlobalStyle`
    .ant-form {
        overflow: hidden;
    }
`;

const CommentForm = ({ post }) => {
	const dispatch = useDispatch();
	const { addCommentDone } = useSelector((state) => state.post);
	const id = useSelector((state) => state.user.me?.id);
	const inputRef = useRef();

	const [comment, onChangeCommnets, setComment] = useInput();
	// const [commentText, setCommentText] = useState('');
	// const onChangeCommnets = useCallback(
	// 	(e) => {
	// 		setCommentText(e.target.value);
	// 	},
	// 	[commentText]
	// );

	useEffect(() => {
		if (addCommentDone) {
			setComment('');
		}
	}, [addCommentDone]);

	const onSubmitComment = useCallback(() => {
		console.log(post.id, comment);
		dispatch({
			type: ADD_COMMENT_REQUEST,
			data: { content: comment, postId: post.id, userId: id },
		});
		inputRef.current.focus();
	}, [comment, id]);

	return (
		<>
			<Global />
			<Form onFinish={onSubmitComment}>
				<Input.TextArea
					rows={4}
					placeholder="maxLength is 6"
					maxLength={400}
					value={comment}
					onChange={onChangeCommnets}
					ref={inputRef}
				/>
				<Button type="primary" style={{ float: 'right' }} htmlType="submit">
					삐약
				</Button>
			</Form>
		</>
	);
};

CommentForm.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.string,
		Comments: PropTypes.arrayOf(PropTypes.any),
		Images: PropTypes.arrayOf(PropTypes.any),
	}),
};

export default CommentForm;
