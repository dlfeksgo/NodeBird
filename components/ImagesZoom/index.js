import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
  .ant-card-cover {
    transform: none !important;
  }
`;

const Overlay = styled.div`
	position: fixed;
	z-index: 5000;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

const Header = styled.header`
	height: 44px;
	background: white;
	position: relative;
	padding: 0;
	text-align: center;

	& h1 {
		margin: 0;
		font-size: 17px;
		color: #333;
		line-height: 44px;
	}
`;

const SlickWrapper = styled.div`
	height: calc(100% - 30px);
	background: #090909;
`;

const CloseBtn = styled(CloseOutlined)`
	position: absolute;
	right: 0;
	top: 0;
	padding: 15px;
	line-height: 14px;
	cursor: pointer;
`;

const Indicator = styled.div`
	text-align: center;

	& > div {
		width: 75px;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		background: #313131;
		display: inline-block;
		text-align: center;
		color: white;
		font-size: 15px;
	}
`;

const ImgWrapper = styled.div`
	padding: 32px;
	text-align: center;

	& img {
		margin: 0 auto;
		max-height: 750px;
	}
`;

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
									<img src={v.src} alt={v.src} />
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
};

export default ImagesZoom;
