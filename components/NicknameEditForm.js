import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';

const FormStyle = styled(Form)`
	margin-bottom: 20px;
	border: 1px solid #d9d9d9;
	padding: 20px;
`;

const NicknameEditForm = () => {
	return (
		<>
			<FormStyle>
				<Input.Search
					addonBefore="닉네임"
					placeholder="닉네임을 입력해주세요."
					allowClear
					// onSearch={onSearch}
					enterButton="수정"
				/>
			</FormStyle>
		</>
	);
};

export default NicknameEditForm;
