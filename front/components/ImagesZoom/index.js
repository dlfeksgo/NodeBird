import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper } from './styles';

const ImagesZoom = ({ images, onClose }) => {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	};

	return (
		<>
			<Overlay>
				<div>
					<Header>
						<h1>상세이미지</h1>
						<CloseBtn onClick={onClose}>X</CloseBtn>
					</Header>
				</div>
				<SlickWrapper>
					<div>
						<Slider {...settings}>
							{images.map((v) => (
								<ImgWrapper key={v.src}>
									<img src={`http://localhost:3065/${v.src}`} alt={v.src} />
								</ImgWrapper>
							))}
						</Slider>
					</div>
				</SlickWrapper>
			</Overlay>
		</>
	);
};

ImagesZoom.propTypes = {
	images: PropTypes.arrayOf(PropTypes.any),
	onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
