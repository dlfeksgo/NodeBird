import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';

import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router';

const ErrorMessage = styled.div`
	color: red;
`;

const Signup = () => {
	const dispatch = useDispatch();
	const { signUpLoading, signUpDone, signUpError } = useSelector(
		(state) => state.user
	);

	useEffect(() => {
		if (signUpDone) {
			Router.push('/');
		}
	}, [signUpDone]);

	useEffect(() => {
		if (signUpError) {
			alert(signUpError);
		}
	}, [signUpError]);

	const [email, onChangeEmail] = useInput('');
	const [nickname, onChangeNickname] = useInput('');
	const [password, onChangePassword] = useInput('');

	const [passwordError, setPasswordError] = useState(false);
	const [passwordCheck, setPasswordCheck] = useState('');
	const onChangePasswordCheck = useCallback(
		(e) => {
			setPasswordCheck(e.target.value);
			setPasswordError(e.target.value !== password);
		},
		[password]
	);

	const [termError, setTermError] = useState(false);
	const [term, setTerm] = useState(false);
	const onChangeTerm = useCallback(
		(e) => {
			setTerm(e.target.checked);
			setTermError(false);
		},
		[term]
	);

	const onSubmit = useCallback(
		(e) => {
			if (!term) {
				return setTermError(true);
			}
			if (password !== passwordCheck) {
				return setPasswordError(true);
			}
			console.log(email, password, nickname);
			dispatch({
				type: SIGN_UP_REQUEST,
				data: { email, password, nickname },
			});
		},
		[password, term, passwordCheck]
	);

	return (
		<>
			<Head>
				<title>회원가입 | NodeBird</title>
			</Head>
			<AppLayout>
				<Form onFinish={onSubmit}>
					<div>
						<label htmlFor="user-id">이메일</label>
						<Input
							name="user-email"
							type="email"
							value={email}
							required
							onChange={onChangeEmail}
						/>
					</div>
					<div>
						<label htmlFor="nickname">닉네임</label>
						<Input
							name="nickname"
							value={nickname}
							required
							onChange={onChangeNickname}
						/>
					</div>
					<div>
						<label htmlFor="user-pw">비밀번호</label>
						<Input
							type="password"
							name="user-pw"
							value={password}
							required
							onChange={onChangePassword}
						/>
					</div>
					<div>
						<label htmlFor="user-pw-check">비밀번호 체크</label>
						<Input
							type="password"
							name="user-pw-check"
							value={passwordCheck}
							required
							onChange={onChangePasswordCheck}
						/>
						{passwordError && (
							<ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
						)}
					</div>
					<div>
						<Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
							약관에 동의하실라유?
						</Checkbox>
						{termError && <ErrorMessage>동의해라~~~</ErrorMessage>}
					</div>
					<div>
						<Button htmlType="submit" loading={signUpLoading}>
							가입하기
						</Button>
					</div>
				</Form>
			</AppLayout>
		</>
	);
};

export default Signup;
