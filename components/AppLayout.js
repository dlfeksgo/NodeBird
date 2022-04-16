import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
	return (
		<>
			<div>
				<Link href="/">
					<a>노드버드</a>
				</Link>
				<Link href="/profile">
					<a>프로필</a>
				</Link>
				<Link href="/signup">
					<a>회원가입</a>
				</Link>
				{children}
			</div>
		</>
	);
};

AppLayout.PropTypes = {
	children: PropTypes.node.isRequired,
};

export default AppLayout;
