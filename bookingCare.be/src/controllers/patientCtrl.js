import { apiStates } from '../supplies/apiSupplies';
import * as patientServ from '../services/patientServ';
import * as constVals from '../utilities';

export const getPatientTokenForConfirmCtrl = async (req, res) => {
	let result = null;
	let isEmpty = false;

	const newData = {
		...req.query,
		doctorId: +req.query.doctorId,
	};

	for (const key in newData) {
		if (newData[key] === '') {
			isEmpty = true;
			break;
		}
	}

	if (typeof newData.doctorId !== constVals.typeKeyValue.numType || isEmpty === true) {
		result = apiStates.fieldRequired;
	} else {
		try {
			result = await patientServ.getPatientTokenForConfirmServ(newData);
		} catch (error) {
			console.log('verifyEmailTokenCtrl error ---', error);
		}
	}
	return res.status(result.status).json(result);
};

export const createABookingByDoctorIdCtrl = async (req, res) => {
	let result = null;
	let newData = req.body;

	if (newData && typeof newData.patientId !== constVals.typeKeyValue.numType) {
		result = {
			errCode: apiStates.incorrectInfo.errCode,
			errCode: apiStates.incorrectInfo.status,
			message: apiStates.incorrectInfo.mesGroup.id,
		};
	} else {
		try {
			result = await patientServ.createABookingByDoctorIdServ(newData);
		} catch (error) {
			console.log('createABookingByDoctorIdCtrl error ---', error);
		}
	}

	return res.status(result.status).json(result);
};
