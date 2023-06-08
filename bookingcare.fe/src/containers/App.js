import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/styles.scss';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import LoadingGif from '../components/loadingGif/LoadingGif';
import ToastComp from '../components/toast/Toast';
import 'react-toastify/dist/ReactToastify.css';
import * as constVals from '../utilities/index';
import * as routeSupplies from '../supplies/routeSupplies';
import * as combinedActions from '../store/actions';

class App extends Component {
	state = {
		isCompleted: false,
	};

	componentDidMount = async () => {
		const isCheck = await this.handlePersistorState();
		if (isCheck) this.setState({ isCompleted: true });
	};

	handlePersistorState = () => {
		return new Promise((resolve, reject) => {
			try {
				const { bootstrapped } = this.props.persistor.getState();
				if (bootstrapped) {
					resolve(true);
				} else resolve(false);
			} catch (error) {
				reject(error);
			}
		});
	};

	renderChildRoutes = (path) => {
		let childRoutes = null;
		const { paths, systemChildRoutes, doctorChildRoutes } = routeSupplies;

		if (path === paths.system) {
			childRoutes = systemChildRoutes;
		} else if (path === paths.doctor) {
			childRoutes = doctorChildRoutes;
		}

		return (
			childRoutes &&
			childRoutes.length > 0 &&
			childRoutes.map((route, idx) => {
				const { path, element, index } = route;
				return (
					<Route
						key={idx}
						index={index}
						path={index ? null : path}
						element={element}
					/>
				);
			})
		);
	};

	getPathEliminatedFn = () => {
		let pathEliminated = null;
		const { userInfo } = this.props;

		if (userInfo) {
			const { paths } = routeSupplies;
			const { adminRole } = constVals.defaultKeys;
			pathEliminated = userInfo.roleId === adminRole ? paths.doctor : paths.system;
		}

		return pathEliminated;
	};

	renderParentRoutes = (list) => {
		let pathEliminated = this.getPathEliminatedFn();

		const tempList = list.map((route, idx) => {
			const { path, element } = route;
			let isRender = false;

			if (pathEliminated) {
				if (path !== pathEliminated) isRender = true;
			} else isRender = true;

			if (isRender) {
				const childRoutes = this.renderChildRoutes(path);
				return (
					<Route
						key={idx}
						path={path}
						element={element}
					>
						{childRoutes && [...childRoutes]}
					</Route>
				);
			}

			return null;
		});

		return <Routes>{tempList}</Routes>;
	};

	render() {
		const { parentRoutes } = routeSupplies;

		return (
			<div className='app'>
				{this.state.isCompleted &&
					parentRoutes &&
					parentRoutes.length > 0 &&
					this.renderParentRoutes(parentRoutes)}
				{this.props.isLoadingSymbol && <LoadingGif />}
				<ToastComp />
			</div>
		);
	}
}

const mapStateToProps = ({ appReducer, userReducer }) => ({
	language: appReducer.language,
	isLoadingSymbol: appReducer.isLoadingSymbol,
	userInfo: userReducer.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
	getGgOauth2UrlFn: () => dispatch(combinedActions.getGgOauth2UrlFn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
