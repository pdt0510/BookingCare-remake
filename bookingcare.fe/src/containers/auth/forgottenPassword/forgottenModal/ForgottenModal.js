import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as combinedActions from '../../../../store/actions';
import './ForgottenModal.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';
import Commons from '../../../../utilities/Commons';
import withRouterHOC from '../../../../hoc/withRouterHOC';
import { compose } from 'redux';
import * as routeSupplies from '../../../../supplies/routeSupplies';
import * as constVals from '../../../../utilities';
import jwt_decode from 'jwt-decode';
import { apiStates } from '../../../../supplies/apiSupplies';

class EmailModal extends Component {
	state = {
		email: '',
		password: '',
		passwordConfirm: '',
	};

	sendEmailToGetTokenhandle = async () => {
		const { email } = this.state;
		const { toggleLoadingGif, router, sendEmailToGetTokenFn } = this.props;
		const isChecked = await Commons.checkEmailRegex(email);

		if (isChecked) {
			toggleLoadingGif();
			const enLang = constVals.LANGUAGES.EN === this.props.language;
			const emailData = { email, enLang };
			const result = await sendEmailToGetTokenFn(emailData);

			if (result.errCode === constVals.defaultValues.noErrors) {
				router.navigate(routeSupplies.paths.main, { replace: true });
			}
			Commons.onToastTimeoutTrigger({ toggleLoadingGif, result });
		}
	};

	sendNewPassword = async () => {
		let result = apiStates.notCreated;
		const { password, passwordConfirm } = this.state;

		if (password === passwordConfirm) {
			const isUpdate = true;
			const isChecked = await Commons.checkFieldValidations(
				{ password },
				isUpdate,
				this.props.isResetPassword,
			);

			if (isChecked) {
				const { toggleLoadingGif, resetPasswordFn, router } = this.props;
				const { token } = router.params;

				const tokenInfo = await jwt_decode(token);
				const expTime = tokenInfo.exp;
				const currentTime = Date.now() / 1000;

				if (expTime && currentTime < expTime) {
					toggleLoadingGif();
					const id = tokenInfo.id;
					const userInfo = { id, token, password };
					result = await resetPasswordFn(userInfo);

					if (result.errCode === constVals.defaultValues.noErrors) {
						router.navigate(routeSupplies.paths.login, { replace: true });
					}
				}

				Commons.onToastTimeoutTrigger({ toggleLoadingGif, result });
			}
		} else alert(`Your 2 passwords are not matched`);
	};

	handleOnchange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	renderEmailModal = () => {
		return (
			<Input
				type='email'
				name='email'
				value={this.state.email}
				placeholder='Your email. . .'
				onChange={this.handleOnchange}
			/>
		);
	};

	renderPasswordModal = () => {
		const { password, passwordConfirm } = this.state;

		return (
			<>
				<Input
					type='password'
					name='password'
					value={password}
					placeholder='Your new password. . .'
					onChange={this.handleOnchange}
				/>
				<Input
					type='password'
					name='passwordConfirm'
					value={passwordConfirm}
					placeholder='Your password confirm. . .'
					onChange={this.handleOnchange}
				/>
			</>
		);
	};

	render() {
		const { isResetPassword } = this.props;

		return (
			<>
				<Modal
					isOpen={true}
					centered
					className='modal-customized billModal-content'
				>
					<ModalHeader toggle={this.closeModalFn}></ModalHeader>
					<ModalBody>{isResetPassword ? this.renderPasswordModal() : this.renderEmailModal()}</ModalBody>
					<ModalFooter>
						<Button
							color='primary'
							onClick={isResetPassword ? this.sendNewPassword : this.sendEmailToGetTokenhandle}
						>
							Send
						</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

const mapStateToProps = ({ appReducer }) => ({
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
	resetPasswordFn: (userInfo) => dispatch(combinedActions.resetPasswordFn(userInfo)),
	sendEmailToGetTokenFn: (email) => dispatch(combinedActions.sendEmailToGetTokenFn(email)),
	sendBillToPatientEmailFn: (newData) => dispatch(combinedActions.sendBillToPatientEmailFn(newData)),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(EmailModal);
