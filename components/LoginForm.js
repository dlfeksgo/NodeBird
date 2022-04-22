import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';

const LoginForm = () => {
	const dispatch = useDispatch();
	const [id, onChangeId] = useInput('');
	const [password, onChangePw] = useInput('');

	const onSubmitForm = useCallback(() => {
		console.log(id, password);
		// setIsLoggedIn(true);
		dispatch(loginAction({ id, password }));
	}, [id, password]);

	return (
		<Form onFinish={onSubmitForm}>
			<div>
				<label htmlFor="user-id">아이디</label>
				<Input
					type="text"
					name="user-id"
					value={id}
					onChange={onChangeId}
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
				<Button type="primary" htmlType="submit">
					로그인
				</Button>
				<Link href="/signup">
					<a>
						<Button>회원가입</Button>
					</a>
				</Link>
			</div>
		</Form>
	);
};

// LoginForm.propTypes = {
// 	setIsLoggedIn: PropTypes.func.isRequired,
// };

export default LoginForm;
