import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generatePasswordTokenFn = (payload = {}, timeLimited) => {
	const key = process.env.JWT_ACCESS_KEY;
	const token = jwt.sign(payload, key, { expiresIn: timeLimited });
	return token;
};

export const generateSessionTokenFn = (payload) => {
	const key = process.env.SESSION_KEY;
	const token = jwt.sign(payload, key, { expiresIn: '1d' });
	return token;
};

export const generateAccessTokenFn = (payload) => {
	const key = process.env.JWT_ACCESS_KEY;
	const token = jwt.sign(payload, key, { expiresIn: '1d' });
	return token;
};

export const generateRefreshTokenFn = (payload) => {
	const key = process.env.JWT_REFRESH_KEY;
	const token = jwt.sign(payload, key, { expiresIn: '30d' });
	return token;
};

export const setCookieFn = (name, value, response) => {
	response.cookie(name, value, {
		httpOnly: true,
		secure: false,
		path: '/',
		sameSite: 'strict',
	});
};
