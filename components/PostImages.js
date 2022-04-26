import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';

const PostImages = ({ images }) => {
	if (images.length === 1) {
		return (
			<>
				<img
					role="presentation"
					src={images[0].src}
					alt={images[0].src}
					// onClick={onZoom}
				/>
			</>
		);
	}

	if (images.length === 2) {
		return (
			<>
				<img
					style={{ width: '50%', display: 'inline-block' }}
					role="presentation"
					src={images[0].src}
					alt={images[0].src}
					// onClick={onZoom}
				/>
				<img
					style={{ width: '50%', display: 'inline-block' }}
					role="presentation"
					src={images[1].src}
					alt={images[1].src}
					// onClick={onZoom}
				/>
			</>
		);
	}

	return (
		<>
			<img
				style={{ width: '50%', display: 'inline-block' }}
				role="presentation"
				src={images[0].src}
				alt={images[0].src}
				// onClick={onZoom}
			/>
			<div
				role="presentation"
				style={{
					width: '50%',
					display: 'inline-block',
					textAlign: 'center',
					verticalAlign: 'middle',
				}}
				// onClick={onZoom}
			>
				<PlusOutlined />
				<br />
				{images.length - 1}개의 사진 더 보기
			</div>
		</>
	);
};

PostImages.propTypes = {
	images: PropTypes.arrayOf(PropTypes.any),
};

export default PostImages;
