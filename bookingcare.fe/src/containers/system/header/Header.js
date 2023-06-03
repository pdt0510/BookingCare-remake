import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import MenuGroup from './menuGroup/MenuGroup';
import Languages from '../../../components/languagesComp/Languages';
import withRouterHOC from '../../../hoc/withRouterHOC';
import { compose } from 'redux';
import * as combinedActions from '../../../store/actions';
import * as constVals from '../../../utilities/index';
import * as routeSupplies from '../../../supplies/routeSupplies';
import Commons from '../../../utilities/Commons';

class Header extends Component {
	state = {
		menus: [],
	};

	componentDidMount = () => {
		const { isLoggedIn, userInfo } = this.props;

		if (isLoggedIn) {
			const { adminRole } = constVals.defaultKeys;
			const { adminMenu, doctorMenu } = routeSupplies;
			let menus = userInfo && userInfo.roleId === adminRole ? adminMenu : doctorMenu;
			this.setState({ menus });
		}
	};

	handleLogout = () => {
		const { router, userLogoutFn } = this.props;
		userLogoutFn();
		router.navigate(routeSupplies.paths.login, { replace: true });
	};

	renderLoggedInName = (info) => {
		const { firstname, lastname } = info;
		const fullname = Commons.handleFullname(firstname, lastname, this.props.language);
		return `${fullname} !`;
	};

	render() {
		const { menus } = this.state;
		const { isLoggedIn, userInfo } = this.props;

		return (
			<div className='header-content'>
				<div className='header-left'>{menus && menus.length > 0 && <MenuGroup menu={menus} />}</div>
				<div className='header-right'>
					<Languages />
					<span className='info-name'>
						{isLoggedIn && userInfo && this.renderLoggedInName(userInfo)}
					</span>
					<span className='info-logout-icon posLayer'>
						<i className='fas fa-sign-out-alt'></i>
						<div
							className='info-logout-btn posLayer'
							onClick={this.handleLogout}
						>
							Log-out
						</div>
					</span>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ userReducer, appReducer }) => ({
	isLoggedIn: userReducer.isLoggedIn,
	userInfo: userReducer.userInfo,
	accessToken: userReducer.accessToken,
	language: appReducer.language,
});

const mapDispatchToProps = (dispatch) => ({
	userLogoutFn: () => dispatch(combinedActions.userLogoutFn()),
	toggleLoadingGif: () => dispatch(combinedActions.toggleLoadingGif()),
});

export default compose(withRouterHOC, connect(mapStateToProps, mapDispatchToProps))(Header);
