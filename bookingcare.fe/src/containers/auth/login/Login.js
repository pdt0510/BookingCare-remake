import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './Login.scss';
import Commons from '../../../utilities/Commons';
import * as combinedActions from '../../../store/actions';
import Languages from '../../../components/languagesComp/Languages';
import * as constVals from '../../../utilities';
import { FormattedMessage, injectIntl } from 'react-intl';
import withRouterHOC from '../../../hoc/withRouterHOC';
import Eye from '../../../components/eye/Eye';
import { Link } from 'react-router-dom';
import * as routeSupplies from '../../../supplies/routeSupplies';

class Login extends Component {
	state = {
		// email: '',
		// password: '',
		email: 'tintuc271@gmail.com',
		password: 'PhanTai@123',
		apiMes: '',
		emailMess: '',
		passwordMess: '',
		isHide: true,
		ggOauth2Url: '',
		fbOauth2Url: '',
	};

	componentDidMount = async () => {
		if (this.props.userInfo) this.setState({});
		if (!this.state.ggOauth2Url) {
			const { url: ggUrl } = await this.props.getGgOauth2UrlFn();
			this.setState({ ggOauth2Url: ggUrl });
		}
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.props.userInfo) this.navigateToSystem();
	};

	navigateToSystem = () => {
		const { userInfo, router, accessToken } = this.props;
		if (userInfo) {
			const { navigate } = router;
			const { adminRole, doctorRole } = constVals.defaultKeys;
			const { userManagerRoute, doctorScheduleRoute, homeRoute } = routeSupplies.defaultRoutesForNav;

			if (userInfo.roleId === adminRole) {
				if (accessToken) navigate(userManagerRoute, { replace: true });
			} else if (userInfo.roleId === doctorRole) {
				navigate(doctorScheduleRoute, { replace: true });
			} else navigate(homeRoute, { replace: true });
		}
	};

	handleLogged = async () => {
		const { email, password } = this.state;
		const isEmail = await Commons.checkEmailRegex(email);
		const isPassword = await Commons.checkPasswordRegex(password);
		const { toggleLoadingGif, userLoginFn } = this.props;

		if (isEmail && isPassword) {
			toggleLoadingGif();
			const result = await userLoginFn({ email, password });

			if (result && result.errCode === constVals.defaultValues.noErrors) {
				const navigateToSystem = this.navigateToSystem;
				Commons.onToastTimeoutTrigger({ toggleLoadingGif, navigateToSystem });
				this.resetForm();
			} else {
				this.setMessToForm(result.message);
				Commons.onToastTimeoutTrigger({ toggleLoadingGif });
			}
		} else {
			const { emailErr, passwordErr } = constVals.clientMessages;
			this.setMessToForm(
				null,
				isEmail === false ? emailErr : null,
				isPassword === false ? passwordErr : null,
			);
		}
	};

	setMessToForm = (apiMes = null, emailMess = null, passwordMess = null) => {
		this.setState({
			apiMes: apiMes ? apiMes : '',
			emailMess: emailMess ? emailMess : '',
			passwordMess: passwordMess ? passwordMess : '',
		});
	};

	resetForm = () => {
		this.setState({
			apiMes: '',
			emailMess: '',
			passwordMess: '',
		});
	};

	handleInput = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	triggerEyes = () => {
		this.setState({
			isHide: !this.state.isHide,
		});
	};

	placeholderMesL = (mesL) => {
		return this.props.intl.formatMessage({ id: mesL });
	};

	render() {
		const { email, password, emailMess, passwordMess, apiMes, isHide, ggOauth2Url } = this.state;
		const { loginL, passwordL, forgottenL, yourEmailL, yourPasswordL, orLogInWithL } =
			constVals.loginLangs;

		return (
			<div className='login-content'>
				<div className='login-bgr'>
					<form className='login-form'>
						<Languages hideLangsWord={true} />
						<div className='login-header'>
							<FormattedMessage id={loginL} />
						</div>
						<div className='login-body'>
							<div className='form-group'>
								<label htmlFor='emailHtmlFor'>Email</label>
								<input
									type='text'
									id='emailHtmlFor'
									className='form-control'
									placeholder={this.placeholderMesL(yourEmailL)}
									name='email'
									value={email}
									onChange={this.handleInput}
								/>
								<span className='login-mess'>{emailMess && emailMess}</span>
							</div>
							<div className='form-group'>
								<div className='group-flex'>
									<label htmlFor='passwordHtmlFor'>
										<FormattedMessage id={passwordL} />
									</label>
									<Eye
										isHide={isHide}
										triggerEyes={this.triggerEyes}
									/>
								</div>
								<input
									type={isHide ? 'password' : 'text'}
									id='passwordHtmlFor'
									className='form-control'
									placeholder={this.placeholderMesL(yourPasswordL)}
									name='password'
									value={password}
									autoComplete='on'
									onChange={this.handleInput}
								/>
								<span className='login-mess'>{passwordMess && passwordMess}</span>
								<span className='login-mess'>{apiMes && apiMes}</span>
							</div>
							<div className='forgotten-password'>
								<Link to={routeSupplies.paths.forgottenPassword}>
									<FormattedMessage id={forgottenL} />
								</Link>
							</div>

							<div
								className='BTN BTN-success btn-login'
								onClick={this.handleLogged}
							>
								<FormattedMessage id={loginL} />
							</div>
						</div>
						<div className='login-footer'>
							<span>
								<FormattedMessage id={orLogInWithL} />
							</span>
							<div className='login-icons'>
								<a href='https://98a5-116-110-41-232.ap.ngrok.io/auth/facebook'>
									<i className='fab fa-facebook facebook-color'></i>
								</a>

								<a href={ggOauth2Url ? ggOauth2Url : '###'}>
									<i className='fab fa-google-plus google-color'></i>
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ appReducer, userReducer }) => ({
	language: appReducer.language,
	isLoggedIn: userReducer.isLoggedIn,
	userInfo: userReducer.userInfo,
	accessToken: userReducer.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
	getGgOauth2UrlFn: () => dispatch(combinedActions.getGgOauth2UrlFn()),
	userLoginFn: (info) => dispatch(combinedActions.userLoginFn(info)),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default compose(
	injectIntl,
	withRouterHOC,
	connect(mapStateToProps, mapDispatchToProps),
)(Login);
