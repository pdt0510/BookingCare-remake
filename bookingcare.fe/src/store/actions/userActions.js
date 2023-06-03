import actionTypes from './actionTypes';
import * as userServClient from '../../services/userServiceClient';
import * as constVals from '../../utilities';

export const getGgOauth2UrlFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getGgOauth2UrlCtrl();
			if (result.errCode === constVals.defaultValues.noErrors) {
				// dispatch(...);
			} else {
				// dispatch(...);
			}
			return result;
		} catch (error) {
			console.log('getGgOauth2UrlFn error - ', error);
		}
	};
};

export const userLogoutFn = () => {
	return async (dispatch) => {
		try {
			if (true) {
				dispatch(userActionFnStates.succeededLogOutFn());
			} else {
				dispatch(userActionFnStates.failedLogOutFn());
			}
			return true;
		} catch (error) {
			console.log('userLogoutFn error - ', error);
		}
	};
};

export const userLoginFn = (info) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.loginUserServ(info);
			if (result.errCode === constVals.defaultValues.noErrors) {
				dispatch(userActionFnStates.succeededLoginFn(result.user, result.accessToken));
			} else {
				dispatch(userActionFnStates.failedLoginFn());
			}
			return result;
		} catch (error) {
			console.log('userLoginFn error - ', error);
		}
	};
};

export const loginByFbFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.loginByFbServ();
			if (result.errCode === constVals.defaultValues.noErrors) {
				dispatch(userActionFnStates.succeededLoginFn(result.user, result.accessToken));
			} else {
				dispatch(userActionFnStates.failedLoginFn());
			}
			return result;
		} catch (error) {
			console.log('userLoginFn error - ', error);
		}
	};
};

export const getDataFrom3rdFn = (info) => {
	return (dispatch) => {
		try {
			const result = info;
			if (result.errCode === constVals.defaultValues.noErrors) {
				dispatch(userActionFnStates.succeededLoginFn(result.user, result.accessToken));
			} else {
				dispatch(userActionFnStates.failedLoginFn());
			}
			return result;
		} catch (error) {
			console.log('getDataFrom3rdFn error - ', error);
		}
	};
};

const userActionFnStates = Object.freeze({
	succeededLogOutFn: () => ({
		type: actionTypes.SUCCEEDED_USER_LOGOUT,
	}),
	failedLogOutFn: () => ({
		type: actionTypes.FAILED_USER_LOGOUT,
	}),

	succeededLoginFn: (info, accessToken) => ({
		type: actionTypes.SUCCEEDED_USER_LOGIN,
		payload: { info, accessToken },
	}),
	failedLoginFn: () => ({
		type: actionTypes.FAILED_USER_LOGIN,
	}),
});
