import React, { useCallback, useRef, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => {
	const { imagePath } = useSelector((state) => state.post);
	const dispatch = useDispatch();
	const imageInput = useRef();
	const postInput = useRef();
	const [text, setText] = useState('');
	const onChangeText = useCallback((e) => {
		setText(e.target.value);
	}, []);

	const onSubmit = useCallback(() => {
		dispatch(addPost);
		setText('');
		postInput.current.focus();
		// inputRef.current.focus(); 왜 안되지
	}, []);

	const onInputClick = useCallback(() => {
		imageInput.current.click();
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
			<div>
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
