import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

import styled from 'styled-components';

const ButtonWrapper = styled.div`
	margin-top: 10px;
`;

const FormWrapper = styled(Form)`
	padding: 10px;
`;

const LoginForm = () => {
	const dispatch = useDispatch();
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePw] = useInput('');
	const { logInLoading, logInError } = useSelector((state) => state.user);

	const onSubmitForm = useCallback(() => {
		console.log(email, password);
		dispatch(loginRequestAction({ email, password }));
	}, [email, password]);

	useEffect(() => {
		if (logInError) {
			alert(logInError);
		}
	}, [logInError]);

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="user-email">이메일</label>
				<Input
					type="email"
					name="user-email"
					value={email}
					onChange={onChangeEmail}
					required
				></Input>
			</div>
			<div>
				<label htmlFor="user-pw">비밀번호</label>
				<Input
					type="password"
					name="user-pw"
					value={password}
					onChange={onChangePw}
					required
				></Input>
			</div>
			<div>
				<ButtonWrapper>
					<Button type="primary" htmlType="submit" loading={logInLoading}>
						로그인
					</Button>
					<Link href="/signup">
						<a>
							<Button>회원가입</Button>
						</a>
					</Link>
				</ButtonWrapper>
			</div>
		</FormWrapper>
	);
};

// LoginForm.propTypes = {
// 	setIsLoggedIn: PropTypes.func.isRequired,
// };

export default LoginForm;
