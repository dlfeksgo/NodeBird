import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
	addPost,
	UPLOAD_IMAGES_REQUEST,
	REMOVE_IMAGES,
	ADD_POST_REQUEST,
} from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
	const { imagePaths, addPostDone } = useSelector((state) => state.post);
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
		if (!text || !text.trim()) {
			return alert('게시글을 작성해주세요.');
		}
		const formData = new FormData();
		imagePaths.forEach((p) => {
			formData.append('image', p);
		});
		formData.append('content', text);
		postInput.current.focus();
		return dispatch({
			type: ADD_POST_REQUEST,
			data: formData,
		});
	}, [text, imagePaths]);

	const onInputClick = useCallback(() => {
		imageInput.current.input.click();
	}, [imageInput.current]);

	const onChangeImages = useCallback((e) => {
		// console.log('images', e.target.files);
		const imageFormData = new FormData(); //이미지를 FormData로 만드는 과정
		//유사배열에 배열메서드 활용하기
		[].forEach.call(e.target.files, (f) => {
			imageFormData.append('image', f);
		});
		dispatch({
			type: UPLOAD_IMAGES_REQUEST,
			data: imageFormData,
		});
	}, []);

	const onRemoveImage = useCallback(
		(index) => () => {
			dispatch({
				type: REMOVE_IMAGES,
				data: index,
			});
		},
		[]
	);

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
				<Input
					type="file"
					multiple
					hidden
					ref={imageInput}
					onChange={onChangeImages}
				></Input>
				<Button onClick={onInputClick}>이미지 업로드</Button>
				{/* <Button type="primary" >짹짹</Button> */}
				<Button type="primary" style={{ float: 'right' }} htmlType="submit">
					짹짹
				</Button>
			</div>
			<div>
				{imagePaths.map((v, i) => (
					<div key={v} style={{ display: 'inline-block' }}>
						<img
							src={`http://localhost:3065/${v}`}
							style={{ width: '200px' }}
							alt={v}
						/>
						<div>
							<Button onClick={onRemoveImage(i)}>제거</Button>
						</div>
					</div>
				))}
			</div>
		</Form>
	);
};

export default PostForm;
