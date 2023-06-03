import actionTypes from './actionTypes';
import * as userServClient from '../../services/userServiceClient';
import * as constVals from '../../utilities';
const { noErrors } = constVals.defaultValues;

export const resetPasswordFn = (userInfo) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.resetPasswordServ(userInfo);
			if (result.errCode === noErrors) {
				// dispatch(...
			} else {
				// dispatch(...
			}
			return result;
		} catch (error) {
			console.log('resetPasswordFn error - ', error);
		}
	};
};

export const sendEmailToGetTokenFn = (emailData) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.sendEmailToGetTokenServ(emailData);
			if (result.errCode === noErrors) {
				// dispatch(...
			} else {
				// dispatch(...
			}
			return result;
		} catch (error) {
			console.log('sendBillToPatientEmailFn error - ', error);
		}
	};
};

export const sendBillToPatientEmailFn = (newData) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.sendBillToPatientEmailServ(newData);
			if (result.errCode === noErrors) {
				// dispatch();
			} else {
				// dispatch();
			}
			return result;
		} catch (error) {
			console.log('sendBillToPatientEmailFn error - ', error);
		}
	};
};

export const getPatientManagerByDoctorIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getPatientManagerByDoctorIdServ(id);
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetPatientManagerByDoctorId(result.records));
			} else {
				dispatch(adminActionFnStates.failedGetPatientManagerByDoctorId());
			}
			return result;
		} catch (error) {
			console.log('getPatientManagerByDoctorIdFn error - ', error);
		}
	};
};

export const getClinicByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getClinicByIdServ(id);
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetClinicById());
			} else {
				dispatch(adminActionFnStates.failedGetClinicById());
			}
			return result;
		} catch (error) {
			console.log('getClinicByIdFn error - ', error);
		}
	};
};

export const getClinicByIdForSystemFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getClinicByIdForSystemServ(id);
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetClinicById());
			} else {
				dispatch(adminActionFnStates.failedGetClinicById());
			}
			return result;
		} catch (error) {
			console.log('getClinicByIdFn error - ', error);
		}
	};
};

export const getClinicListFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getClinicListServ();
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetClinicList());
			} else {
				dispatch(adminActionFnStates.failedGetClinicList());
			}
			return result;
		} catch (error) {
			console.log('getClinicListFn error - ', error);
		}
	};
};

export const getAllClinicsFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getAllClinicsServ();
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetAllClinics(result.records));
			} else {
				dispatch(adminActionFnStates.failedGetAllClinics());
			}
			return result;
		} catch (error) {
			console.log('getAllClinicsFn error - ', error);
		}
	};
};

export const createOrUpdateClinicFn = (newData) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.createOrUpdateClinicServ(newData);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededCreateClinic());
			} else {
				dispatch(adminActionFnStates.failedCreateClinic());
			}
			return result;
		} catch (error) {
			console.log('createOrUpdateClinicFn error - ', error);
		}
	};
};

export const getSpecialityAndDoctorByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getSpecialityAndDoctorByIdServ(id);
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeeDedGetSpecialityAndDoctorByid(result.record));
			} else {
				dispatch(adminActionFnStates.failedGetSpecialityAndDoctorByid());
			}
			return result;
		} catch (error) {
			console.log('getSpecialityAndDoctorByIdFn error - ', error);
		}
	};
};

export const getAllSpecialitiesFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getAllSpecialitiesServ();
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetAllSpecialities(result.records));
			} else {
				dispatch(adminActionFnStates.failedGetAllSpecialities());
			}
			return result;
		} catch (error) {
			console.log('getAllSpecialitiesFn error - ', error);
		}
	};
};

export const createSpecialityFn = (newData) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.createSpecialityServ(newData);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededPatientTokenConfirm());
			} else {
				dispatch(adminActionFnStates.failedPatientTokenConfirm());
			}
			return result;
		} catch (error) {
			console.log('createSpecialityFn error - ', error);
		}
	};
};

export const getPatientTokenForConfirmFn = (info) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getPatientTokenForConfirmServ(info);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededPatientTokenConfirm());
			} else {
				dispatch(adminActionFnStates.failedPatientTokenConfirm());
			}
			return result;
		} catch (error) {
			console.log('getPatientTokenForConfirmFn error - ', error);
		}
	};
};

export const sendInfoToEmailFn = (newData) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.sendInfoToEmailServ(newData);
			if (result.errCode === noErrors) {
				// dispatch();
			} else {
				// dispatch();
			}
			return result;
		} catch (error) {
			console.log('sendInfoToEmailFn error - ', error);
		}
	};
};

export const createBookingAccFn = (newData) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.createBookingAccServ(newData);
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededCreateBookingAcc());
			} else {
				dispatch(adminActionFnStates.failedCreateBookingAcc());
			}
			return result;
		} catch (error) {
			console.log('createBookingAccFn error - ', error);
		}
	};
};

export const getDoctorExtraInfoByIdForUiFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getDoctorExtraInfoByIdForUiServ(id);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededgetDoctorExtraInfoByIdForUI());
			} else {
				dispatch(adminActionFnStates.failedgetDoctorExtraInfoByIdForUI());
			}
			return result;
		} catch (error) {
			console.log('getDoctorExtraInfoByIdForUiFn error - ', error);
		}
	};
};

export const getDoctorExtraInfoByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getDoctorExtraInfoByIdServ(id);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededgetDoctorExtraInfoById());
			} else {
				dispatch(adminActionFnStates.failedgetDoctorExtraInfoById());
			}
			return result;
		} catch (error) {
			console.log('getDoctorWorkdateByIdFn error - ', error);
		}
	};
};

export const createDoctorExtraInfoByIdFn = (newData) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.createDoctorExtraInfoByIdServ(newData);
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededCreateDoctorExtraInfoById());
			} else {
				dispatch(adminActionFnStates.failedCreateDoctorExtraInfoById());
			}
			return result;
		} catch (error) {
			console.log('createDoctorExtraInfoByIdFn error - ', error);
		}
	};
};

export const getAllcodesExtraFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getAllcodesExtraServ();
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetAllcodesExtra(result.records));
			} else {
				dispatch(adminActionFnStates.failedGetAllcodesExtra());
			}
			return result;
		} catch (error) {
			console.log('getAllcodesExtraFn error - ', error);
		}
	};
};

export const getDoctorWorkdateByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getDoctorWorkdateByIdServ(id);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetDoctorWorkdateById(result.records));
			} else {
				dispatch(adminActionFnStates.failedGetDoctorWorkdateById());
			}
			return result;
		} catch (error) {
			console.log('getDoctorWorkdateByIdFn error - ', error);
		}
	};
};

export const getDoctorScheduleByInfoFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getDoctorScheduleByIdServ(id);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetDoctorScheduleByInfo(result.records));
			} else {
				dispatch(adminActionFnStates.failedGetDoctorScheduleByInfo());
			}
			return result;
		} catch (error) {
			console.log('getDoctorScheduleByInfoFn error - ', error);
		}
	};
};

export const createDoctorScheduleFn = (data) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.createDoctorScheduleServ(data);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededCreateDoctorSchedule());
			} else {
				dispatch(adminActionFnStates.failedCreateDoctorSchedule());
			}
			return result;
		} catch (error) {
			console.log('createDoctorScheduleFn error - ', error);
		}
	};
};

export const getScheduleRangeFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getScheduleRangeServ();
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetScheduleRange(result.records));
			} else {
				dispatch(adminActionFnStates.failedGetScheduleRange());
			}
			return result;
		} catch (error) {
			console.log('getAllcodesFn error - ', error);
		}
	};
};

export const getDoctorMarkdownByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getDoctorMarkdownByIdServ(id);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetDoctorMarkdown());
			} else {
				dispatch(adminActionFnStates.failedGetDoctorMarkdown());
			}
			return result;
		} catch (error) {
			console.log('getDoctorMarkdownByIdFn error - ', error);
		}
	};
};

export const getDoctorIntroByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getDoctorIntroByIdServ(id);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetDoctorIntro());
			} else {
				dispatch(adminActionFnStates.failedGetDoctorIntro());
			}
			return result;
		} catch (error) {
			console.log('getDoctorIntroByIdFn error - ', error);
		}
	};
};

export const getDoctorInfoByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getDoctorInfoByIdServ(id);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetDoctorinfo());
			} else {
				dispatch(adminActionFnStates.failedGetDoctorinfo());
			}
			return result;
		} catch (error) {
			console.log('getDoctorMarkdownFn error - ', error);
		}
	};
};

export const getDoctorContentByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getDoctorMarkdownServ(id);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetDoctorContent());
			} else {
				dispatch(adminActionFnStates.failedGetDoctorContent());
			}
			return result;
		} catch (error) {
			console.log('getDoctorContentByIdFn error - ', error);
		}
	};
};

export const createDoctorMarkdownFn = (data) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.createDoctorMarkdownServ(data);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededCreateDoctorMarkdown());
			} else {
				dispatch(adminActionFnStates.failedCreateDoctorMarkdown());
			}
			return result;
		} catch (error) {
			console.log('createDoctorMarkdownFn error - ', error);
		}
	};
};

export const getAllDoctorsFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getAllDoctorsServ();
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetAllDoctors(result.records));
			} else {
				dispatch(adminActionFnStates.failedGetAllDoctors());
			}
			return result;
		} catch (error) {
			console.log('getAllcodesFn error - ', error);
		}
	};
};

export const getUserAllcodesFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getUserAllcodesServ();

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetUserAllCodes());
			} else {
				dispatch(adminActionFnStates.failedGetUserAllCodes());
			}
			return result;
		} catch (error) {
			console.log('getAllcodesFn error - ', error);
		}
	};
};

export const updateAnUserFn = (newData) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.updateUserByIdServ(newData);
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededUpdateAnUser());
			} else {
				dispatch(adminActionFnStates.failedUpdateAnUser());
			}
			return result;
		} catch (error) {
			console.log('deleteUserByIdFn error - ', error);
		}
	};
};

export const getAnUserByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.getAnUserByIdServ(id);

			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeedGetAnUserById());
			} else {
				dispatch(adminActionFnStates.failedGetAnUserById());
			}
			return result;
		} catch (error) {
			console.log('getAnUserByIdFn error - ', error);
		}
	};
};

export const deleteUserByIdFn = (id) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.deleteUserByIdServ(id);
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeedDeleteById());
			} else {
				dispatch(adminActionFnStates.failedDeleteById());
			}
			return result;
		} catch (error) {
			console.log('deleteUserByIdFn error - ', error);
		}
	};
};

export const createAccountFn = (newData) => {
	return async (dispatch) => {
		try {
			const result = await userServClient.createLocalAccServ(newData);
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededCreateAccountFn());
			} else {
				dispatch(adminActionFnStates.failedCreateAccountFn());
			}
			return result;
		} catch (error) {
			console.log('createAccountFn error - ', error);
		}
	};
};

export const GetAllUsersFn = () => {
	return async (dispatch) => {
		try {
			const result = await userServClient.GetAllUsersServ();
			if (result.errCode === noErrors) {
				dispatch(adminActionFnStates.succeededGetAllUsersFn(result.users));
			} else {
				dispatch(adminActionFnStates.failedGetAllUsersFn());
			}
			return result;
		} catch (error) {
			console.log('GetAllUsersFn error - ', error);
		}
	};
};

const adminActionFnStates = Object.freeze({
	succeededGetPatientManagerByDoctorId: (records) => ({
		type: actionTypes.SUCCEEDED_GET_PATIENT_MANAGER_BY_DOCTOR_ID,
		payload: { records },
	}),
	failedGetPatientManagerByDoctorId: () => ({
		type: actionTypes.FAILED_GET_PATIENT_MANAGER_BY_DOCTOR_ID,
	}),

	succeededGetClinicById: () => ({
		type: actionTypes.SUCCEEDED_GET_CLINIC_BY_ID,
	}),
	failedGetClinicById: () => ({
		type: actionTypes.FAILED_GET_CLINIC_BY_ID,
	}),

	succeededGetClinicList: () => ({
		type: actionTypes.SUCCEEDED_GET_CLINIC_LIST,
	}),
	failedGetClinicList: () => ({
		type: actionTypes.FAILED_GET_CLINIC_LIST,
	}),

	succeededGetAllClinics: (records) => ({
		type: actionTypes.SUCCEEDED_GET_ALL_CLINICS,
		payload: { records },
	}),
	failedGetAllClinics: () => ({
		type: actionTypes.FAILED_GET_ALL_CLINICS,
	}),

	succeededCreateClinic: () => ({
		type: actionTypes.SUCCEEDED_CREATE_CLINIC,
	}),
	failedCreateClinic: () => ({
		type: actionTypes.FAILED_CREATE_CLINIC,
	}),

	succeeDedGetSpecialityAndDoctorByid: (records) => ({
		type: actionTypes.SUCCEEDED_GET_SPECIALITY_AND_DOCTOR_BYID,
		payload: { records },
	}),
	failedGetSpecialityAndDoctorByid: () => ({
		type: actionTypes.FAILED_GET_SPECIALITY_AND_DOCTOR_BYID,
	}),

	succeededGetAllSpecialities: (records) => ({
		type: actionTypes.SUCCEEDED_GET_ALL_SPECIALITIES,
		payload: { records },
	}),
	failedGetAllSpecialities: () => ({
		type: actionTypes.FAILED_GET_ALL_SPECIALITIES,
	}),

	succeededPatientTokenConfirm: () => ({
		type: actionTypes.SUCCEEDED_PATIENT_TOKEN_CONFIRM,
	}),
	failedPatientTokenConfirm: () => ({
		type: actionTypes.FAILED_PATIENT_TOKEN_CONFIRM,
	}),

	succeededCreateBookingAcc: () => ({
		type: actionTypes.SUCCEEDED_CREATE_BOOKING_ACC,
	}),
	failedCreateBookingAcc: () => ({
		type: actionTypes.FAILED_CREATE_BOOKING_ACC,
	}),

	succeededgetDoctorExtraInfoByIdForUI: () => ({
		type: actionTypes.SUCCEEDED_GET_DOCTOR_EXTRA_INFO_BY_ID_FOR_UI,
	}),
	failedgetDoctorExtraInfoByIdForUI: () => ({
		type: actionTypes.FAILED_GET_DOCTOR_EXTRA_INFO_BY_ID_FOR_UI,
	}),

	succeededgetDoctorExtraInfoById: () => ({
		type: actionTypes.SUCCEEDED_GET_DOCTOR_EXTRA_INFO_BY_ID,
	}),
	failedgetDoctorExtraInfoById: () => ({
		type: actionTypes.FAILED_GET_DOCTOR_EXTRA_INFO_BY_ID,
	}),

	succeededCreateDoctorExtraInfoById: () => ({
		type: actionTypes.SUCCEEDED_CREATE_DOCTOR_EXTRA_INFO_BYID,
	}),
	failedCreateDoctorExtraInfoById: () => ({
		type: actionTypes.FAILED_CREATE_DOCTOR_EXTRA_INFO_BYID,
	}),

	succeededGetAllcodesExtra: (records) => ({
		type: actionTypes.SUCCEEDED_GET_ALLCODES_EXTRA,
		payload: { records },
	}),
	failedGetAllcodesExtra: () => ({
		type: actionTypes.FAILED_GET_ALLCODES_EXTRA,
	}),

	succeededGetDoctorWorkdateById: (records) => ({
		type: actionTypes.SUCCEEDED_GET_DOCTOR_WORKDATE_BY_ID,
		payload: { records },
	}),
	failedGetDoctorWorkdateById: () => ({
		type: actionTypes.FAILED_GET_DOCTOR_WORKDATE_BY_ID,
	}),

	succeededGetDoctorScheduleByInfo: (records) => ({
		type: actionTypes.SUCCEEDED_GET_DOCTOR_SCHEDULE_BY_INFO,
		payload: { records },
	}),
	failedGetDoctorScheduleByInfo: () => ({
		type: actionTypes.FAILED_GET_DOCTOR_SCHEDULE_BY_INFO,
	}),

	succeededCreateDoctorSchedule: () => ({
		type: actionTypes.SUCCEEDED_CREATE_DOCTOR_SCHEDULE,
	}),
	failedCreateDoctorSchedule: () => ({
		type: actionTypes.FAILED_CREATE_DOCTOR_SCHEDULE,
	}),

	succeededGetScheduleRange: (records) => ({
		type: actionTypes.SUCCEEDED_GET_SCHEDULE_RANGE,
		payload: { records },
	}),
	failedGetScheduleRange: () => ({
		type: actionTypes.FAILED_GET_SCHEDULE_RANGE,
	}),

	succeededGetDoctorMarkdown: () => ({
		type: actionTypes.SUCCEEDED_GET_DOCTOR_MARKDOWN,
	}),
	failedGetDoctorMarkdown: () => ({
		type: actionTypes.FAILED_GET_DOCTOR_MARKDOWN,
	}),

	succeededGetDoctorIntro: () => ({
		type: actionTypes.SUCCEEDED_GET_DOCTOR_INTRO,
	}),
	failedGetDoctorIntro: () => ({
		type: actionTypes.FAILED_GET_DOCTOR_INTRO,
	}),

	succeededGetDoctorinfo: () => ({
		type: actionTypes.SUCCEEDED_GET_DOCTOR_INFO,
	}),
	failedGetDoctorinfo: () => ({
		type: actionTypes.FAILED_GET_DOCTOR_INFO,
	}),

	succeededGetDoctorContent: () => ({
		type: actionTypes.SUCCEEDED_GET_DOCTOR_CONTENT,
	}),
	failedGetDoctorContent: () => ({
		type: actionTypes.FAILED_GET_DOCTOR_CONTENT,
	}),

	succeededCreateDoctorMarkdown: () => ({
		type: actionTypes.SUCCEEDED_CREATE_DOCTOR_MARKDOWN,
	}),
	failedCreateDoctorMarkdown: () => ({
		type: actionTypes.FAILED_CREATE_DOCTOR_MARKDOWN,
	}),

	succeededGetAllDoctors: (records) => ({
		type: actionTypes.SUCCEEDED_GET_ALL_DOCTORS,
		payload: { records },
	}),
	failedGetAllDoctors: () => ({
		type: actionTypes.FAILED_GET_ALL_DOCTORS,
	}),

	succeededGetUserAllCodes: () => ({
		type: actionTypes.SUCCEEDED_GET_USER_ALLCODES,
	}),
	failedGetUserAllCodes: () => ({
		type: actionTypes.FAILED_GET_USER_ALLCODES,
	}),

	succeededUpdateAnUser: () => ({
		type: actionTypes.SUCCEEDED_UPDATE_AN_USER,
	}),
	failedUpdateAnUser: () => ({
		type: actionTypes.FAILED_UPDATE_AN_USER,
	}),

	succeedGetAnUserById: () => ({
		type: actionTypes.SUCCEEDED_GET_AN_USER_BY_ID,
	}),
	failedGetAnUserById: () => ({
		type: actionTypes.FAILED_GET_AN_USER_BY_ID,
	}),

	succeedDeleteById: () => ({
		type: actionTypes.SUCCEEDED_DELETE_BY_ID,
	}),
	failedDeleteById: () => ({
		type: actionTypes.FAILED_DELETE_BY_ID,
	}),

	succeededCreateAccountFn: () => ({
		type: actionTypes.SUCCEEDED_CREATE_ACCOUNT,
	}),
	failedCreateAccountFn: () => ({
		type: actionTypes.FAILED_CREATE_ACCOUNT,
	}),

	succeededGetAllUsersFn: (records) => ({
		type: actionTypes.SUCCEEDED_GET_ALL_USERS,
		payload: { records },
	}),
	failedGetAllUsersFn: () => ({
		type: actionTypes.FAILED_GET_ALL_USERS,
	}),
});
