import jwt from 'jsonwebtoken';
import 'dotenv/config';
import * as constVals from '../utilities/index';
import * as tokenFns from '../supplies/tokenSupplies';

export const refreshTokenCtrl = (req, res, next) => {
	try {
		let id = +req.query.id;
		if (!id) id = +req.headers.id;

		if (id) {
			const key = process.env.JWT_REFRESH_KEY;
			const cookie_param = req.headers.cookie_param;
			const refreshToken = req.cookies.refreshToken; //from browser

			if (!refreshToken || cookie_param !== refreshToken)
				return res.status(401).json(`You're not authenticated`);

			jwt.verify(refreshToken, key, (err, decoded) => {
				if (err) return res.status(403).json(err);
				else {
					const userNewData = { id, ...decoded };
					const newAccessToken = tokenFns.generateAccessTokenFn(userNewData);
					const newRefreshToken = tokenFns.generateRefreshTokenFn(userNewData);
					tokenFns.setCookieFn(constVals.nameKeysValues.refreshToken, newRefreshToken, res);

					const tokensForUpdate = {
						id: userNewData.id,
						refreshToken: newRefreshToken,
						accessToken: newAccessToken,
					};

					req.body = tokensForUpdate;
					next();
				}
			});
		} else return res.status(404).json(`Something's wrong`);
	} catch (error) {
		console.log('refreshTokenCtrl error', error);
	}
};

export const clearBrowserCookieCtrl = (req, res, next) => {
	let id = +req.query.id;
	if (!id) id = +req.headers.id;

	if (id) {
		res.clearCookie(constVals.nameKeysValues.refreshToken);
		req.body = { id };
		next();
	} else return res.status(404).json(`Something's wrong`);
};

export const verifyTokenForAdminCtrl = (req, res, next) => {
	try {
		verifyTokenCtrl(req, res, () => {
			const user = res.user;
			if (user) {
				if (user.roleId === constVals.defaultKeys.adminRole) next();
				else return res.status(401).json(`You're not allowed`);
			} else return res.status(404).json(`Not found`);
		});
	} catch (error) {
		console.log('verifyTokenForAdminCtrl error', error);
	}
};

export const verifyTokenCtrl = (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (token) {
			const accessToken = token.split(' ')[1];
			if (accessToken !== 'null' || accessToken !== null || accessToken !== '') {
				const key = process.env.JWT_ACCESS_KEY;
				jwt.verify(accessToken, key, (err, decoded) => {
					if (err) {
						return res.status(403).json(err);
						throw err;
					} else {
						res.user = decoded;
						next();
					}
				});
			}
		} else {
			return res.status(401).json(`You're not authenticated`);
		}
	} catch (error) {
		console.log('verifyTokenCtrl error', error);
	}
};
