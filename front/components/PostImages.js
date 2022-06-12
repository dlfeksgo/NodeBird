import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
	const [showImageZoom, setShowImageZoom] = useState(false);
	const onZoom = useCallback(() => {
		setShowImageZoom(true);
	}, []);

	const onClose = useCallback(() => {
		setShowImageZoom(false);
	}, []);

	if (images.length === 1) {
		return (
			<>
				<img
					role="presentation"
					src={`http://localhost:3065/${images[0].src}`}
					alt={images[0].src}
					onClick={onZoom}
				/>
				{showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
			</>
		);
	}

	if (images.length === 2) {
		return (
			<>
				<img
					style={{ width: '50%', display: 'inline-block' }}
					role="presentation"
					src={`http://localhost:3065/${images[0].src}`}
					alt={images[0].src}
					onClick={onZoom}
				/>
				<img
					style={{ width: '50%', display: 'inline-block' }}
					role="presentation"
					src={`http://localhost:3065/${images[1].src}`}
					alt={images[1].src}
					onClick={onZoom}
				/>
				{showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
			</>
		);
	}

	return (
		<>
			<div>
				<img
					style={{ width: '50%', display: 'inline-block' }}
					role="presentation"
					src={`http://localhost:3065/${images[0].src}`}
					alt={images[0].src}
					onClick={onZoom}
				/>
				<div
					role="presentation"
					style={{
						width: '50%',
						display: 'inline-block',
						textAlign: 'center',
						verticalAlign: 'middle',
					}}
					onClick={onZoom}
				>
					<PlusOutlined />
					<br />
					{images.length - 1}개의 사진 더 보기
				</div>
			</div>
			{showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
		</>
	);
};

PostImages.propTypes = {
	images: PropTypes.arrayOf(PropTypes.any),
};

export default PostImages;
