import express from 'express';
import * as userCtrls from '../controllers/userCtrl';
import * as doctorCtrls from '../controllers/doctorCtrl';
import * as patientCtrls from '../controllers/patientCtrl';
import * as specialityCtrls from '../controllers/specialityCtrl';
import * as clinicCtrls from '../controllers/clinicCtrl';
import * as apiSupplies from '../supplies/apiSupplies';
import * as tokenMidd from '../controllers/tokenMidd';
import 'dotenv/config';

const appRouters = express.Router();
const initWebRoutes = (app) => {
	const {
		apiUrl,
		createAccountApi,
		getAllUsersApi,
		getUserByIdApi,
		updateUserByIdApi,
		deleteUserByIdApi,
		loginUserApi,
		getAllcodesApi,
		getUserAllcodesApi,
		getAllDoctorsApi,
		createDoctorMarkdownApi,
		getDoctorContentByIdApi,
		getDoctorInfoByIdApi,
		getDoctorIntroByIdApi,
		getDoctorMarkdownByIdApi,
		getScheduleRangeApi,
		createDoctorScheduleApi,
		getDoctorScheduleByInfoApi,
		getDoctorWorkdateByIdApi,
		getAllcodesExtraApi,
		createDoctorExtraInfoByIdApi,
		getDoctorExtraInfoByIdApi,
		getDoctorExtraInfoByIdForUiApi,
		sendInfoToEmailApi,
		verifyPatientTokenApi,
		createSpecialityApi,
		getAllSpecialitiesApi,
		getSpecialityAndDoctorByIdApi,
		createClinicApi,
		getAllClinicsApi,
		getClinicListApi,
		getClinicByIdForSystemApi,
		getClinicContentByIdApi,
		getPatientManagerByDoctorIdApi,
		sendBillToPatientEmailApi,
		resetRefreshTokenApi,
		clearAllCookiesApi,
		getUsersInPagination,
		sendEmailToGetTokenApi,
		resetPasswordApi,
		createBookingAccApi,
	} = apiSupplies.urls;

	const {
		createLocalAccCtrl,
		createBookingAccCtrl,
		getAllUsersCtrl,
		getUserByIdCtrl,
		updateUserByIdCtrl,
		deleteUserByIdCtrl,
		getAllcodesCtrl,
		getUserAllcodesCtrl,
		getAllDoctorsCtrl,
		updateRefreshTokenCtrl,
		clearAllCookiesByIdCtrl,
		getUsersInPaginationCtrl,
		localPassportLoginCtrl,
		sendEmailToGetTokenCtrl,
		resetPasswordCtrl,
	} = userCtrls;

	const {
		createDoctorMarkdownCtrl,
		getDoctorContentByIdCtrl,
		getDoctorInfoByIdCtrl,
		getDoctorIntroByIdCtrl,
		getDoctorMarkdownByIdCtrl,
		getScheduleRangeCtrl,
		createDoctorScheduleCtrl,
		getDoctorScheduleByIdCtrl,
		getDoctorWorkdateByIdCtrl,
		getAllcodesExtraCtrl,
		createDoctorExtraInfoByIdCtrl,
		getDoctorExtraInfoByIdCtrl,
		getDoctorExtraInfoByIdForUiCtrl,
		sendInfoToEmailCtrl,
		getPatientManagerByDoctorIdCtrl,
		sendBillToPatientEmailCtrl,
	} = doctorCtrls;

	const { getPatientTokenForConfirmCtrl } = patientCtrls;

	const { createSpecialityCtrl, getAllSpecialitiesCtrl, getSpecialityAndDoctorByIdCtrl } =
		specialityCtrls;
	const {
		createOrUpdateClinicCtrl,
		getAllClinicsCtrl,
		getClinicListFn,
		getClinicByIdForSystemCtrl,
		getClinicContentByIdCtrl,
	} = clinicCtrls;

	const { verifyTokenCtrl, verifyTokenForAdminCtrl, refreshTokenCtrl, clearBrowserCookieCtrl } =
		tokenMidd;

	// login
	appRouters.post(loginUserApi, localPassportLoginCtrl);
	appRouters.post(createAccountApi, createLocalAccCtrl);

	// forgotten password
	appRouters.post(sendEmailToGetTokenApi, sendEmailToGetTokenCtrl);
	appRouters.post(resetPasswordApi, resetPasswordCtrl);

	//homepage
	appRouters.get(getAllSpecialitiesApi, getAllSpecialitiesCtrl);
	appRouters.get(getAllClinicsApi, getAllClinicsCtrl);
	appRouters.get(getScheduleRangeApi, getScheduleRangeCtrl);
	appRouters.get(getAllDoctorsApi, getAllDoctorsCtrl);

	//details of ...
	appRouters.get(getDoctorIntroByIdApi, getDoctorIntroByIdCtrl);
	appRouters.get(getDoctorWorkdateByIdApi, getDoctorWorkdateByIdCtrl);
	appRouters.get(getDoctorMarkdownByIdApi, getDoctorMarkdownByIdCtrl);
	appRouters.get(getDoctorExtraInfoByIdForUiApi, getDoctorExtraInfoByIdForUiCtrl);
	appRouters.get(getSpecialityAndDoctorByIdApi, getSpecialityAndDoctorByIdCtrl);
	appRouters.get(getClinicContentByIdApi, getClinicContentByIdCtrl);

	//booking modal && confirm
	appRouters.post(createBookingAccApi, createBookingAccCtrl);
	appRouters.patch(updateUserByIdApi, updateUserByIdCtrl);
	appRouters.post(sendInfoToEmailApi, sendInfoToEmailCtrl);
	appRouters.get(verifyPatientTokenApi, getPatientTokenForConfirmCtrl);

	//others
	appRouters.get(getUserAllcodesApi, getUserAllcodesCtrl);

	//apis controlled by token,
	appRouters.use(verifyTokenCtrl);
	appRouters.get(getAllUsersApi, getAllUsersCtrl);
	appRouters.post(clearAllCookiesApi, clearBrowserCookieCtrl, clearAllCookiesByIdCtrl);
	appRouters.get(getUserByIdApi, getUserByIdCtrl);
	appRouters.get(getAllcodesApi, getAllcodesCtrl);
	appRouters.post(createDoctorMarkdownApi, createDoctorMarkdownCtrl);
	appRouters.get(getDoctorContentByIdApi, getDoctorContentByIdCtrl);
	appRouters.get(getDoctorInfoByIdApi, getDoctorInfoByIdCtrl);
	appRouters.post(createDoctorScheduleApi, createDoctorScheduleCtrl);
	appRouters.get(getDoctorScheduleByInfoApi, getDoctorScheduleByIdCtrl);
	appRouters.get(getAllcodesExtraApi, getAllcodesExtraCtrl);
	appRouters.post(createDoctorExtraInfoByIdApi, createDoctorExtraInfoByIdCtrl);
	appRouters.get(getDoctorExtraInfoByIdApi, getDoctorExtraInfoByIdCtrl);
	appRouters.post(createSpecialityApi, createSpecialityCtrl);
	appRouters.post(createClinicApi, createOrUpdateClinicCtrl);
	appRouters.get(getClinicListApi, getClinicListFn);
	appRouters.get(getClinicByIdForSystemApi, getClinicByIdForSystemCtrl);
	appRouters.post(sendBillToPatientEmailApi, sendBillToPatientEmailCtrl);
	appRouters.get(getPatientManagerByDoctorIdApi, getPatientManagerByDoctorIdCtrl);
	appRouters.delete(deleteUserByIdApi, verifyTokenForAdminCtrl, deleteUserByIdCtrl);
	appRouters.post(resetRefreshTokenApi, refreshTokenCtrl, updateRefreshTokenCtrl);
	appRouters.get(getUsersInPagination, getUsersInPaginationCtrl);

	return app.use(apiUrl, appRouters);
};

export default initWebRoutes;
