import { nameKeysValues } from '../../utilities/constant';
import actionTypes from '../actions/actionTypes';

const { isLoggedIn, userInfo, accessToken } = nameKeysValues;

const initialState = {
	[isLoggedIn]: false,
	[userInfo]: null,
	[accessToken]: null,
};

const userReducer = (state = initialState, action) => {
	const { type } = action;
	if (type === actionTypes.SUCCEEDED_USER_LOGIN) {
		return {
			...state,
			[isLoggedIn]: true,
			[userInfo]: action.payload.info,
			[accessToken]: action.payload.accessToken,
		};
	} else if (type === actionTypes.SUCCEEDED_USER_LOGOUT) {
		return {
			...state,
			[isLoggedIn]: false,
			[userInfo]: null,
			[accessToken]: null,
		};
	}

	return state;
};

export default userReducer;
