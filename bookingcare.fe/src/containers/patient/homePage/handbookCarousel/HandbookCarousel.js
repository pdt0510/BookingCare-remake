import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HandbookCarousel.scss';
import CarouselComp from '../carouses/CarouselComp';

class HandbookCarousel extends Component {
	render() {
		const title = 'Cẩm nang';
		const list = [
			{
				img: require('../../../../assets/images/handbook/081852-review-nha-khoa-360-dental-co-tot-khong.png'),
				name: 'Top 5 bệnh viện mổ mắt cận tốt, uy tín tại TpHCM',
			},
			{
				img: require('../../../../assets/images/handbook/141711-bac-si-da-lieu-gioi-tphcm.png'),
				name: '7 bác sĩ giỏi về da liễu',
			},
			{
				img: require('../../../../assets/images/handbook/212144-phong-kham-chan-thuong-chinh-hinh-tot-tphcm.png'),
				name: 'Phòng khám chấn thương chỉnh hình',
			},
			{
				img: require('../../../../assets/images/handbook/222445-kham-ho-hap-o-dau-tot-tphcm.png'),
				name: 'Các bệnh viện, phòng khám hô hấp uy tín',
			},
			{
				img: require('../../../../assets/images/handbook/141711-bac-si-da-lieu-gioi-tphcm.png'),
				name: '7 bác sĩ giỏi về da liễu',
			},
			{
				img: require('../../../../assets/images/handbook/212144-phong-kham-chan-thuong-chinh-hinh-tot-tphcm.png'),
				name: 'Phòng khám chấn thương chỉnh hình',
			},
			{
				img: require('../../../../assets/images/handbook/222445-kham-ho-hap-o-dau-tot-tphcm.png'),
				name: 'Các bệnh viện, phòng khám hô hấp uy tín',
			},
		];
		const settings = {
			slidesToScroll: 1,
		};

		return (
			<div className='HandbookCarousel-content'>
				<CarouselComp
					list={list}
					title={title}
					settings={settings}
				/>
			</div>
		);
	}
}

const mapStateToProps = ({ appReducer }) => ({
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HandbookCarousel);
