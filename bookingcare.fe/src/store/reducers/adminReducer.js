import actionTypes from '../actions/actionTypes';
import Commons from '../../utilities/Commons';

const initialState = {
	allUsers: null,
	allDoctors: null,
	timeMarkList: null,
	doctorWorkdate: null,
	allcodesExtra: null,
	allSpecialities: null,
	allSpecialitiesForSystem: null,
	specialityAndDoctorsById: null,
	allClinics: null,
	patientList: null,
};

const adminReducer = (state = initialState, action) => {
	const { type, payload } = action;
	if (type === actionTypes.SUCCEEDED_GET_ALL_USERS) {
		return {
			...state,
			allUsers: payload.records,
		};
	} else if (type === actionTypes.SUCCEEDED_GET_ALL_DOCTORS) {
		return {
			...state,
			allDoctors: payload.records,
		};
	} else if (type === actionTypes.SUCCEEDED_GET_SCHEDULE_RANGE) {
		return {
			...state,
			timeMarkList: payload.records,
		};
	} else if (type === actionTypes.SUCCEEDED_GET_DOCTOR_WORKDATE_BY_ID) {
		return {
			...state,
			doctorWorkdate: payload.records,
		};
	} else if (type === actionTypes.FAILED_GET_DOCTOR_WORKDATE_BY_ID) {
		return {
			...state,
			doctorWorkdate: null,
		};
	} else if (type === actionTypes.SUCCEEDED_GET_ALLCODES_EXTRA) {
		return {
			...state,
			allcodesExtra: payload.records,
		};
	} else if (type === actionTypes.SUCCEEDED_GET_ALL_SPECIALITIES) {
		const allSpecialitiesForSystem = [];
		return {
			...state,
			allSpecialities: payload.records.map((item) => {
				allSpecialitiesForSystem.push({
					id: item.id,
					name: item.name,
				});
				return {
					id: item.id,
					name: item.name,
					img: Commons.convertBinaryToBase64(item.image.data),
				};
			}),
			allSpecialitiesForSystem,
		};
	} else if (type === actionTypes.SUCCEEDED_GET_SPECIALITY_AND_DOCTOR_BYID) {
		return {
			...state,
			specialityAndDoctorsById: payload.records,
		};
	} else if (type === actionTypes.SUCCEEDED_GET_ALL_CLINICS) {
		return {
			...state,
			allClinics: payload.records.map((item) => {
				return {
					id: item.id,
					name: item.name,
					img: Commons.convertBinaryToBase64(item.image.data),
				};
			}),
		};
	} else if (type === actionTypes.SUCCEEDED_GET_PATIENT_MANAGER_BY_DOCTOR_ID) {
		return {
			...state,
			patientList: payload.records,
		};
	}

	return state;
};

export default adminReducer;
