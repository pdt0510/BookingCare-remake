export const urls = Object.freeze({
	homeUrl: '/',
	apiUrl: '/api',
	id: '/:id',
	createAccountApi: '/create-acc',
	getAllUsersApi: '/get-all-users',
	getUserByIdApi: '/get-user-by-id',
	updateUserByIdApi: '/update-user-by-id',
	deleteUserByIdApi: '/delete-user-by-id',

	loginUserApi: '/login-user',
	getAllcodesApi: '/get-allCodes',
	getUserAllcodesApi: '/get-user-allCodes',
	getAllDoctorsApi: '/get-all-doctors',
	createDoctorMarkdownApi: '/create-doctor-markdown',
	getDoctorContentByIdApi: '/get-doctor-content-byId',
	getDoctorInfoByIdApi: '/get-doctor-info-byId',
	getDoctorIntroByIdApi: '/get-doctor-intro-byId',
	getDoctorMarkdownByIdApi: '/get-doctor-markdown-byId',
	getScheduleRangeApi: '/get-schedule-range',
	createDoctorScheduleApi: '/create-doctor-schedule',
	getDoctorScheduleByInfoApi: '/create-doctor-schedule-byId',
	getDoctorWorkdateByIdApi: '/get-doctor-workdate-byId',
	getAllcodesExtraApi: '/get-allcodes-extra',
	createDoctorExtraInfoByIdApi: '/create-doctor-extra-info-byId',
	getDoctorExtraInfoByIdApi: '/get-doctor-extra-info-byId',
	getDoctorExtraInfoByIdForUiApi: '/get-doctor-extra-info-byId-forUI',
	sendInfoToEmailApi: '/send-info-to-email',
	verifyPatientTokenApi: '/verify-patient-token',
	createSpecialityApi: '/create-a-speciality',
	getAllSpecialitiesApi: '/get-all-specialities',
	getSpecialityAndDoctorByIdApi: '/get-speciality-and-doctor-ById',
	createClinicApi: '/create-clinic',
	getAllClinicsApi: '/get-all-clinics',
	getClinicListApi: '/get-clinic-list',
	getClinicByIdForSystemApi: '/get-clinic-byId-for-system',
	getClinicContentByIdApi: '/get-clinic-content-byId',
	getPatientManagerByDoctorIdApi: '/get-patient-manager-byId',
	sendBillToPatientEmailApi: '/send-bill-to-patient-email',
	resetRefreshTokenApi: '/reset-refresh-token',
	clearAllCookiesApi: '/clear-all-cookies',
	getUsersInPagination: '/get-users-in-pagination',
	getGgOauth2UrlApi: '/gg-oauth2-url',
	ggCallbackUrl: '/api/sessions/oauth/google',
	getFbOauth2UrlApi: '/auth/facebook',
	fbCallbackUrl: '/auth/facebook/callback',
	sendEmailToGetTokenApi: '/send-email-to-get-token',
	resetPasswordApi: '/reset-password',
	createBookingAccApi: '/create-booking-acc',
});

export const apiStates = Object.freeze({
	noErrors: {
		errCode: 0,
		status: 200, //OK
		message: 'Successfully requested',
	},
	fieldRequired: {
		errCode: 1,
		status: 400, //Bad Request
		message: 'Fields required',
	},
	notFound: {
		errCode: 2,
		status: 404, //Not Found
		message: 'Not Found!',
	},
	incorrectInfo: {
		errCode: 3,
		status: 406, // Not Acceptable
		mesGroup: {
			id: 'Incorrect id',
			email: 'Incorrect email',
			account: 'Incorrect account',
			password: 'Incorrect password',
			isActived: 'Your request is already actived',
			arr: 'Data is not an array',
			existed: 'Data is existed',
			token: 'Token is expired',
		},
	},
	missingParams: {
		errCode: 4,
		status: 406, // Not Acceptable
		idMes: 'Missing required id',
	},
	notCreated: {
		errCode: 5,
		status: 501, //Not Implemented
		message: `It's not created`,
	},
	serverError: {
		errCode: -1,
		status: 500, //OK
		message: 'Internal Server Error',
	},
});
