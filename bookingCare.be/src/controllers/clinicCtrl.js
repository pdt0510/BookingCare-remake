import * as clinicServ from '../services/clinicServ';
import { apiStates } from '../supplies/apiSupplies';

export const getClinicContentByIdCtrl = async (req, res) => {
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 const id = +req.query.id;

 if (id && typeof id === 'number') {
  try {
   result = await clinicServ.getClinicContentByIdServ(id);
  } catch (error) {
   console.log('getClinicContentByIdCtrl error ---', error);
  }
 }

 return res.status(result.status).json(result);
};

export const getClinicByIdForSystemCtrl = async (req, res) => {
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 const id = +req.query.id;

 if (id && typeof id === 'number') {
  try {
   result = await clinicServ.getClinicByIdForSystemServ(id);
  } catch (error) {
   console.log('getClinicByIdForSystemCtrl error ---', error);
  }
 }

 return res.status(result.status).json(result);
};

export const getClinicListFn = async (req, res) => {
 let result = null;

 try {
  result = await clinicServ.getClinicListServ();
 } catch (error) {
  result = apiStates.serverError;
  console.log('getClinicListFn error ---', error);
 }

 return res.status(result.status).json(result);
};

export const getAllClinicsCtrl = async (req, res) => {
 let result = null;

 try {
  result = await clinicServ.getAllClinicsServ();
 } catch (error) {
  result = apiStates.serverError;
  console.log('getAllClinicsCtrl error ---', error);
 }

 return res.status(result.status).json(result);
};

export const createOrUpdateClinicCtrl = async (req, res) => {
 let isEmpty = false;
 let data = null;
 const newData = req.body;

 for (const key in newData) {
  if (newData[key] === '') {
   isEmpty = true;
   break;
  }
 }

 if (isEmpty === true) {
  data = apiStates.fieldRequired;
 } else {
  try {
   data = await clinicServ.createOrUpdateClinicServ(newData);
  } catch (error) {
   data = apiStates.serverError;
   console.log('createOrUpdateClinicCtrl error ---', error);
  }
 }
 return res.status(data.status).json(data);
};
