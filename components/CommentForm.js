import React, { useCallback, useRef, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { createGlobalStyle } from 'styled-components';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Global = createGlobalStyle`
    .ant-form {
        overflow: hidden;
    }
`;

const CommentForm = ({ post }) => {
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

	const onSubmitComment = useCallback(() => {
		console.log(post.id, comment);
		setComment('');
		inputRef.current.focus();
	}, [comment]);

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
		createdAt: PropTypes.object,
		Comments: PropTypes.arrayOf(PropTypes.any),
		Images: PropTypes.arrayOf(PropTypes.any),
	}),
};

export default CommentForm;
