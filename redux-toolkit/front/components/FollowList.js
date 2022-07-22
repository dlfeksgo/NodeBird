import React from 'react';
import { List, Card, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';

const ListStyle = styled(List)`
	margin-bottom: 20px;
	padding-bottom: 20px;
`;

const MoreBtn = styled.div`
	text-align: center;
`;

const FollowList = ({ header, data, onClickMore, loading }) => {
	return (
		<ListStyle
			header={<div>{header}</div>}
			bordered
			size="small"
			loadMore={
				<MoreBtn>
					<Button onClick={onClickMore} loading={loading}>
						더보기
					</Button>
				</MoreBtn>
			}
			grid={{
				gutter: 4,
				xs: 2,
				md: 3,
			}}
			dataSource={data}
			renderItem={(item) => (
				<List.Item>
					<Card actions={[<StopOutlined key="stop" />]}>
						<Card.Meta description={item.nickname}></Card.Meta>
					</Card>
				</List.Item>
			)}
		/>
	);
};

FollowList.propTypes = {
	header: PropTypes.string.isRequired,
	// data: PropTypes.array.isRequired,
	onClickMore: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default FollowList;
