import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorIntro.scss';
import * as combinedActions from '../../../../store/actions';
import * as constVals from '../../../../utilities';
import Commons from '../../../../utilities/Commons';
import { FormattedMessage } from 'react-intl';
import { Navigate, Link } from 'react-router-dom';
import { paths } from '../../../../supplies/routeSupplies';
import { compose } from 'redux';
import withRouterHOC from '../../../../hoc/withRouterHOC';

class DoctorIntro extends Component {
	state = {
		desc: '',
		avatar: '',
		firstname: '',
		lasrname: '',
		fullname: '',
		doctorPrice: null,
	};

	componentDidMount = async () => {
		const { doctorId } = this.props;
		let result = await this.props.getDoctorIntroByIdFn(doctorId);
		if (result && result.errCode === constVals.defaultValues.noErrors) {
			this.postAllToState(result.record);
		}
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { language } = this.props;
		if (prevProps.language !== language && this.state.fullname) {
			const { firstname, lastname } = this.state;
			const fullname = Commons.handleFullname(firstname, lastname, language);
			this.setState({ fullname });
		}
	};

	postAllToState = (record) => {
		const { avatar, doctorMarkdownData, firstname, lastname } = record;
		const { description } = doctorMarkdownData;

		const descArr = description ? description.split('\n') : ['No content'];
		const fullname = Commons.handleFullname(firstname, lastname, this.props.language);
		const avatarConverted = Commons.convertBinaryToBase64(avatar);
		const doctorPrice = record.userInforData;

		this.setState({
			avatar: avatarConverted,
			desc: descArr,
			firstname,
			lastname,
			fullname,
			doctorPrice,
		});
	};

	renderImgUrl = (imgStr) => {
		return (
			<div
				className='imgBgr doctorIntro-avatar'
				style={{ backgroundImage: `url(${imgStr})` }}
			></div>
		);
	};

	renderDesc = (list) => {
		return list.map((item, idx) => {
			return <div key={idx}>{item}</div>;
		});
	};

	renderBookingInfo = (bookingInfo) => {
		const { doctorPrice, fullname } = this.state;

		if (bookingInfo && doctorPrice) {
			const { time, dateBookedStr } = bookingInfo;
			const { bookingFreeL, bookingTimeL, priceL } = constVals.doctorIntroLangs;

			const { valueEN, valueVI } = doctorPrice.getPriceValue;
			const priceVal = Commons.formatCurrency(valueEN, valueVI, this.props.language);
			this.props.getDoctorIntro({ priceVal, fullname });

			return (
				<span className='bookingTime-Info'>
					<FormattedMessage id={bookingTimeL} />: {time}, {dateBookedStr}
					<br />
					<FormattedMessage id={priceL} />: {priceVal}
					<br />
					<FormattedMessage id={bookingFreeL} />
				</span>
			);
		}
	};

	navToDoctorInfo = () => {
		const pathname = `${paths.doctorInfo.split(':')[0] + this.props.doctorId}`;
		this.props.router.navigate(pathname);
	};

	render() {
		const { avatar, fullname, desc } = this.state;
		const { bookingInfo } = this.props;

		return (
			<div className='doctorIntro-content container'>
				<div className='doctorIntro-left'>{avatar && this.renderImgUrl(avatar)}</div>
				<div className='doctorIntro-right'>
					<div
						className='doctorIntro-name'
						onClick={this.props.navFromSpeciality ? this.navToDoctorInfo : null}
					>
						Bs {fullname}
					</div>
					<div className='doctorIntro-desc'>
						{bookingInfo ? this.renderBookingInfo(bookingInfo) : desc && this.renderDesc(desc)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ appReducer }) => ({
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
	getDoctorIntroByIdFn: (id) => dispatch(combinedActions.getDoctorIntroByIdFn(id)),
});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(DoctorIntro);
