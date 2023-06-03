import moment from 'moment';
import viLang from '../translations/vi.json';
import enLang from '../translations/en.json';
import { dateFormat, LANGUAGES, nameKeysValues } from './constant';
import * as constVals from '.';
import { Buffer } from 'buffer';
import jwt_decode from 'jwt-decode';

class Commons {
	static checkExprireToken = async (token) => {
		const expTime = token ? await jwt_decode(token).exp : 0;
		const currentTime = Date.now() / 1000;
		return currentTime > expTime;
	};

	static checkFieldValidations = async (objVals, isUpdate = false) => {
		let isValid = true;
		const { email, password } = constVals.nameKeysValues;

		for (const key in objVals) {
			if (objVals[key] === null || objVals[key] === undefined || objVals[key] === '') {
				if (key === constVals.nameKeysValues.avatar) {
				} else isValid = false;
			} else if (key === email && isUpdate === false) {
				isValid = await Commons.checkEmailRegex(objVals[key]);
			} else if (key === password && isUpdate === false) {
				isValid = await Commons.checkPasswordRegex(objVals[key]);
			}

			if (isValid === false) {
				if (key === password) {
					alert(`Your "${key}" must be greater 8 chars including: aB1@, ..vv `);
				} else alert(`Your "${key}" is incorrect`);

				break;
			}
		}
		return isValid;
	};

	static handleFullname = (name1st, lastname, enLang) => {
		if (enLang === constVals.LANGUAGES.EN) {
			return `${name1st} ${lastname}`;
		}
		return `${lastname} ${name1st}`;
	};

	static onToastTimeoutTrigger = (paramObj) => {
		let { result, toggleLoadingGif, navigateToSystem } = paramObj;
		let callingToast = false;
		if (result) {
			const { toastSuccess, toastError } = constVals.displayToast;
			callingToast = () =>
				result.errCode === constVals.defaultValues.noErrors
					? toastSuccess(result.message)
					: toastError(result.message);
		}

		setTimeout(() => {
			toggleLoadingGif && toggleLoadingGif();
			navigateToSystem && navigateToSystem();
			callingToast && callingToast();
		}, constVals.defaultValues.delayTime);

		return true;
	};

	static getLangFiles = () => {
		const { vi, en } = nameKeysValues;
		const messages = {
			[vi]: viLang,
			[en]: enLang,
		};
		return messages;
	};

	static convertFileToUrl(fileObj) {
		return URL.createObjectURL(fileObj);
	}

	static convertFileToBase64(fileObj) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(fileObj);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	static convertBinaryToBase64(binaryObj) {
		return new Buffer.from(binaryObj).toString();
	}

	static convertObjDateTo_DMYstr = (dateObj) => {
		if (dateObj) {
			return moment(dateObj).format(dateFormat.DMY);
		}
		return null;
	};

	static convertObjDateTo_dDMstr = (dateObj) => {
		if (dateObj) {
			return moment(dateObj).format(dateFormat.dDM);
		}
		return null;
	};

	static convertDateToTimestamp = (dateObj) => {
		if (dateObj) {
			const _23hs = 23 * 3600;
			const converted = moment(dateObj, dateFormat.DMY);
			return Date.parse(converted) / 1000 + _23hs;
		}
		return null;
	};

	static convertTimestampTo_dDMstr = (timestamp) => {
		if (timestamp) {
			return moment(timestamp * 1000).format(dateFormat.dDM);
		}
		return null;
	};

	static convertTimestampTo_DMYstr = (timestamp) => {
		if (timestamp) {
			return moment(timestamp * 1000).format(dateFormat.DMY);
		}
		return null;
	};

	static convertTimestampTo_dDMYstr = (timestamp) => {
		if (timestamp) {
			return moment(timestamp * 1000).format(dateFormat.dDMY);
		}
		return null;
	};

	static getTimestampCurrentDate = () => {
		const strDate = Commons.convertObjDateTo_DMYstr(new Date());
		const currentTimestamp = Commons.convertDateToTimestamp(strDate);
		return currentTimestamp;
	};

	static formatCurrency = (valueEN, valueVI, enLang) => {
		if (enLang === constVals.LANGUAGES.EN) {
			return `${valueEN}$`;
		}
		return `${valueVI / 1000}.000đ`;
	};

	static convertHtmlStrToText = (htmlStr) => {
		if (htmlStr) {
			return <span dangerouslySetInnerHTML={{ __html: htmlStr }} />;
		}
		return <span>No content</span>;
	};

	static switchLangLocally = (language) => {
		const { weekdaysVI, weekdaysEN } = dateFormat;
		if (language === LANGUAGES.EN) {
			return moment.updateLocale(LANGUAGES.EN, { weekdays: weekdaysEN });
		} else {
			return moment.updateLocale(LANGUAGES.VI, { weekdays: weekdaysVI });
		}
	};

	static checkEmailRegex = (emailStr) => {
		return new Promise((resolve, reject) => {
			try {
				const regex = /^\w+(\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
				const isChecked = regex.test(emailStr);
				resolve(isChecked);
			} catch (error) {
				reject(error);
			}
		});
	};

	static checkUsername = (str) => {
		//20 <= chars >= 8, chữ hoa, thường, số
		const regex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
		return regex.test(str);
	};

	static checkPasswordRegex = (passwordStr) => {
		return new Promise(async (resolve, reject) => {
			try {
				//chữ thường + hoa + số + đặc biệt (! @ ^..) ++  >= 8 chars
				const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
				resolve(regex.test(passwordStr));
			} catch (error) {
				reject(error);
			}
		});
	};

	static numberRegex = (number) => {
		const regex = /^[0-9]+$/;
		return regex.test(number);
	};
}

export default Commons;
