import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';

const LoginForm = () => {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');

	const onChangeId = useCallback(
		(e) => {
			setId(e.target.value);
		},
		[id, password]
	);

	const onChangePw = useCallback(
		(e) => {
			setPassword(e.target.value);
		},
		[id, password]
	);

	return (
		<Form>
			<div>
				<lable htmlFor="user-id">아이디</lable>
				<Input
					type="text"
					name="user-id"
					value={id}
					onChange={onChangeId}
					required
				></Input>
			</div>
			<div>
				<lable htmlFor="user-pw">비밀번호</lable>
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
