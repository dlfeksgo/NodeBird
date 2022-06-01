import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const FormStyle = styled(Form)`
	margin-bottom: 20px;
	border: 1px solid #d9d9d9;
	padding: 20px;
`;

const NicknameEditForm = () => {
	const { me } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const [nickname, setNickname] = useState(me?.nickname || '');
	const onChangeNickname = useCallback((e) => {
		setNickname(e.target.value);
	});

	const onSubmit = useCallback(() => {
		dispatch({
			type: CHANGE_NICKNAME_REQUEST,
			data: nickname,
		});
	}, [nickname]);

	return (
		<>
			<FormStyle>
				<Input.Search
					addonBefore="닉네임"
					placeholder="닉네임을 입력해주세요."
					allowClear
					onSearch={onSubmit}
					onChange={onChangeNickname}
					enterButton="수정"
				/>
			</FormStyle>
		</>
	);
};

export default NicknameEditForm;
