import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Button, Row, Col } from 'antd';
import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import Router from 'next/router';

const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`;

const AppLayout = ({ children }) => {
	const [searchInput, onChangeSearchInput] = useInput('');
	const me = useSelector((state) => state.user.me);

	const onSearch = useCallback(() => {
		Router.push(`/hashtag/${searchInput}`);
	}, [searchInput]);

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
						<SearchInput
							enterButton
							value={searchInput}
							onChange={onChangeSearchInput}
							onSearch={onSearch}
						/>
					</Menu.Item>
					{me ? (
						''
					) : (
						<Menu.Item key="signup">
							<Link href="/signup">
								<a>회원가입</a>
							</Link>
						</Menu.Item>
					)}
				</Menu>
				<Row gutter={8}>
					<Col xs={24} md={6}>
						{me ? <UserProfile /> : <LoginForm />}
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

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppLayout;
