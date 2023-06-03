import axiosConfigs from '../axiosConfigs';
import * as apiSupplies from '../supplies/apiSupplies';

export const createBookingAccServ = (newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, createBookingAccApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + createBookingAccApi, newData);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const resetPasswordServ = (userInfo) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, resetPasswordApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + resetPasswordApi, userInfo);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const sendEmailToGetTokenServ = (emailData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, sendEmailToGetTokenApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + sendEmailToGetTokenApi, emailData);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const loginByFbServ = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { getFbOauth2UrlApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(getFbOauth2UrlApi);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getGgOauth2UrlCtrl = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { getGgOauth2UrlApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(getGgOauth2UrlApi);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const sendBillToPatientEmailServ = (newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, sendBillToPatientEmailApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + sendBillToPatientEmailApi, newData);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getPatientManagerByDoctorIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getPatientManagerByDoctorIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getPatientManagerByDoctorIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getClinicByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getClinicContentByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getClinicContentByIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getClinicByIdForSystemServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getClinicByIdForSystemApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getClinicByIdForSystemApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getClinicListServ = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getClinicListApi } = apiSupplies.urls;
			const data = await axiosConfigs.get(apiUrl + getClinicListApi);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

export const getAllClinicsServ = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getAllClinicsApi } = apiSupplies.urls;
			const data = await axiosConfigs.get(apiUrl + getAllClinicsApi);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

export const createOrUpdateClinicServ = (newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, createClinicApi } = apiSupplies.urls;
			const data = await axiosConfigs.post(apiUrl + createClinicApi, newData);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

export const getSpecialityAndDoctorByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getSpecialityAndDoctorByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getSpecialityAndDoctorByIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getAllSpecialitiesServ = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getAllSpecialitiesApi } = apiSupplies.urls;
			const data = await axiosConfigs.get(apiUrl + getAllSpecialitiesApi);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

export const createSpecialityServ = (newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, createSpecialityApi } = apiSupplies.urls;
			const data = await axiosConfigs.post(apiUrl + createSpecialityApi, newData);
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

export const getPatientTokenForConfirmServ = (info) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, verifyPatientTokenApi } = apiSupplies.urls;
			const data = await axiosConfigs.get(apiUrl + verifyPatientTokenApi, {
				params: info,
			});
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

export const sendInfoToEmailServ = (newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, sendInfoToEmailApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + sendInfoToEmailApi, newData);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getDoctorExtraInfoByIdForUiServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getDoctorExtraInfoByIdForUiApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getDoctorExtraInfoByIdForUiApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getDoctorExtraInfoByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getDoctorExtraInfoByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getDoctorExtraInfoByIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const createDoctorExtraInfoByIdServ = (newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, createDoctorExtraInfoByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + createDoctorExtraInfoByIdApi, newData);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getAllcodesExtraServ = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getAllcodesExtraApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getAllcodesExtraApi);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getDoctorWorkdateByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getDoctorWorkdateByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getDoctorWorkdateByIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getDoctorScheduleByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getDoctorScheduleByInfoApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getDoctorScheduleByInfoApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const createDoctorScheduleServ = (newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, createDoctorScheduleApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + createDoctorScheduleApi, newData);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getScheduleRangeServ = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getScheduleRangeApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getScheduleRangeApi);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getDoctorMarkdownByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getDoctorMarkdownByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getDoctorMarkdownByIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getDoctorIntroByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getDoctorIntroByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getDoctorIntroByIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getDoctorInfoByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getDoctorInfoByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getDoctorInfoByIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getDoctorMarkdownServ = (doctorId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getDoctorContentByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getDoctorContentByIdApi, {
				params: { doctorId },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const createDoctorMarkdownServ = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, createDoctorMarkdownApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + createDoctorMarkdownApi, data);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getAllDoctorsServ = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getAllDoctorsApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getAllDoctorsApi);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getUserAllcodesServ = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getUserAllcodesApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getUserAllcodesApi);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const updateUserByIdServ = (newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, updateUserByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.patch(apiUrl + updateUserByIdApi, newData);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getAnUserByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getUserByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getUserByIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const deleteUserByIdServ = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, deleteUserByIdApi } = apiSupplies.urls;
			const result = await axiosConfigs.delete(apiUrl + deleteUserByIdApi, {
				params: { id },
			});
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const createLocalAccServ = (newData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, createAccountApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + createAccountApi, newData);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const GetAllUsersServ = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, getAllUsersApi } = apiSupplies.urls;
			const result = await axiosConfigs.get(apiUrl + getAllUsersApi);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const loginUserServ = (info) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { apiUrl, loginUserApi } = apiSupplies.urls;
			const result = await axiosConfigs.post(apiUrl + loginUserApi, info);
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};
