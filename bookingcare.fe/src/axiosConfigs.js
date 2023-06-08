import axios from 'axios';
import { paths } from './supplies/routeSupplies';
import Commons from './utilities/Commons';

let accessToken = JSON.parse(localStorage.getItem('persist:user'))?.accessToken;

let accessTokenVal =
	accessToken === 'null' || accessToken === null || accessToken === undefined
		? null
		: accessToken.slice(1, -1);

const defaultConfigs = {
	baseURL: process.env.REACT_APP_BACKEND_URL || 8080,
	withCredentials: true,
};
const instance = axios.create(defaultConfigs);

instance.interceptors.request.use(
	async (config) => {
		const isExpired = await Commons.checkExprireToken(accessTokenVal);

		if (accessTokenVal && isExpired) {
			window.location.href = paths.login;
			const resetUserInfo = {
				userInfo: null,
				isLoggedIn: false,
				accessToken: null,
			};
			localStorage.setItem('persist:user', JSON.stringify(resetUserInfo));
		} else config.headers.Authorization = `Bearer ${accessTokenVal}`;

		return config;
	},
	(error) => error,
);

instance.interceptors.response.use(
	(response) => {
		if (response.data && response.data.accessToken) {
			accessTokenVal = response.data.accessToken;
		}
		return response.data;
	},
	(error) => error.response.data,
);

export default instance;
