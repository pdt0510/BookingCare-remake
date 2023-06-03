import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VerifyEmail.scss';
import HomeHeader from '../homePage/homeHeader/HomeHeader';
import * as combinedActions from '../../../store/actions';
import { compose } from 'redux';
import withRouterHOC from '../../../hoc/withRouterHOC';
import * as constVals from '../../../utilities';
import Commons from '../../../utilities/Commons';
import { paths } from '../../../supplies/routeSupplies';

class VerifyEmail extends Component {
	state = {
		message: null,
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.message) {
			this.props.router.navigate(paths.main, { replace: true });
		}
	};

	renderConfirmClick = () => {
		const { doctorId, token } = this.props.router.params;

		if (doctorId && token) {
			const info = { doctorId, token };
			const enLang = this.props.language === constVals.LANGUAGES.EN;

			const eleHighLighted = (
				<a
					href='##'
					onClick={() => this.handleConfirm(info)}
					className='emailVerify-highlight'
				>
					{enLang ? 'here' : 'vào đây'}
				</a>
			);
			const emailContent = enLang ? (
				<>Click {eleHighLighted} to confirm your appointment.</>
			) : (
				<>Nhấn {eleHighLighted} để xác nhận cuộc hẹn.</>
			);

			return emailContent;
		}
	};

	handleConfirm = async (info) => {
		const { toggleLoadingGif, getPatientTokenForConfirmFn } = this.props;

		toggleLoadingGif();
		const result = await getPatientTokenForConfirmFn(info);
		Commons.onToastTimeoutTrigger({ toggleLoadingGif, result });

		this.setState({
			message:
				result.errCode === constVals.defaultValues.noErrors ? 'Successfully actived' : result.message,
		});
	};

	render() {
		return (
			<div className='emailVerify-content'>
				<HomeHeader />
				<div className='emailVerify-email-info'>
					<h3 className='emailVerify-confirm'>
						{this.state.message === null && this.renderConfirmClick()}
					</h3>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ appReducer }) => {
	return {
		language: appReducer.language,
		isLoggedIn: appReducer.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => ({
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
	getPatientTokenForConfirmFn: (info) => dispatch(combinedActions.getPatientTokenForConfirmFn(info)),
});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(VerifyEmail);
