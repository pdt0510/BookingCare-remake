import React, { Component } from 'react';
import { connect } from 'react-redux';
import Banner from './banner/Banner';
import DoctorCarousel from './doctorCarousel/DoctorCarousel';
import ClinicCarousel from './clinicCarousel/ClinicCarousel';
import HandbookCarousel from './handbookCarousel/HandbookCarousel';
import HomeHeader from './homeHeader/HomeHeader';
import './HomePage.scss';
import SpecialityCarousel from './specialityCarousel/SpecialityCarousel';
import About from './about/About';
import HomeFooter from './homeFooter/HomeFooter';
import Commons from '../../../utilities/Commons';

class HomePage extends Component {
	render() {
		return (
			<div className='homePage-content'>
				<HomeHeader />
				<Banner />
				<SpecialityCarousel />
				<ClinicCarousel />
				<DoctorCarousel />
				<HandbookCarousel />
				<About />
				<HomeFooter />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({});
export default connect(null, mapDispatchToProps)(HomePage);

class Notfound extends Component {
	render() {
		return (
			<div>
				<h1>Not Found Page</h1>
			</div>
		);
	}
}

export { Notfound };
