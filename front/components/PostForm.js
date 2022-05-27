import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
	const { imagePath, addPostDone } = useSelector((state) => state.post);
	const dispatch = useDispatch();
	const imageInput = useRef();
	const postInput = useRef();
	const [text, onChangeText, setText] = useInput('');

	useEffect(() => {
		if (addPostDone) {
			setText('');
		}
	}, [addPostDone]);

	const onSubmit = useCallback(() => {
		dispatch(addPost({ content: text }));
		// setText('');
		postInput.current.focus();
		// inputRef.current.focus(); 왜 안되지
	}, [text]);

	const onInputClick = useCallback(() => {
		imageInput.current.input.click();
	}, [imageInput.current]);

	return (
		<Form encType="multipart/form-data" onFinish={onSubmit}>
			<Input.TextArea
				ref={postInput}
				value={text}
				onChange={onChangeText}
				maxLength={140}
				placeholder="여기다가 적어봐요~"
			></Input.TextArea>
			<div style={{ marginBottom: '20px' }}>
				<Input type="file" multiple hidden ref={imageInput}></Input>
				<Button onClick={onInputClick}>이미지 업로드</Button>
				{/* <Button type="primary" >짹짹</Button> */}
				<Button type="primary" style={{ float: 'right' }} htmlType="submit">
					짹짹
				</Button>
			</div>
		</Form>
	);
};

export default PostForm;
