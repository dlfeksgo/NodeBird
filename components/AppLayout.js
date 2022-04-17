import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Button, Row, Col } from 'antd';
import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';

const AppLayout = ({ children }) => {
	//더미데이터
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<>
			<div>
				<Menu mode="horizontal">
					<Menu.Item key="home">
						<Link href="/">
							<a>Home</a>
						</Link>
					</Menu.Item>
					<Menu.Item key="profile">
						<Link href="/profile">
							<a>프로필</a>
						</Link>
					</Menu.Item>
					<Menu.Item key="mail">
						<Input.Search enterButton style={{ verticalAlign: 'middle' }} />
					</Menu.Item>
					<Menu.Item>
						<Link href="/signup">
							<a>회원가입</a>
						</Link>
					</Menu.Item>
				</Menu>
				<Row gutter={8}>
					<Col xs={24} md={6}>
						{isLoggedIn ? <UserProfile /> : <LoginForm />}
					</Col>
					<Col xs={24} md={12}>
						{children}
					</Col>
					<Col xs={24} md={6}>
						<a
							href="http://www.naver.com"
							target="_blank"
							rel="noreferrer noopener"
						>
							네이보오
						</a>
					</Col>
				</Row>
			</div>
		</>
	);
};

AppLayout.PropTypes = {
	children: PropTypes.node.isRequired,
};

export default AppLayout;
