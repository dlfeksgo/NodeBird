import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';

const LoginForm = ({ setIsLoggedIn }) => {
	const [id, setId] = useState('abc');
	const [password, setPassword] = useState('111');

	const onChangeId = useCallback((e) => {
		setId(e.target.value);
	}, []);

	const onChangePw = useCallback((e) => {
		setPassword(e.target.value);
	}, []);

	const onSubmitForm = useCallback(() => {
		console.log(id, password);
		setIsLoggedIn(true);
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

export default LoginForm;
