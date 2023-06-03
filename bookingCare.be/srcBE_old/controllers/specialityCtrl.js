import * as specialityServ from '../services/specialityServ';
import { apiStates } from '../supplies/apiSupplies';

export const getSpecialityAndDoctorByIdCtrl = async (req, res) => {
 const id = +req.query.id;
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  status: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === 'number') {
  try {
   result = await specialityServ.getSpecialityAndDoctorByIdServ(id);
  } catch (error) {
   console.log('getSpecialityAndDoctorByIdCtrl error ---', error);
  }
 }

 return res.status(result.status).json(result);
};

export const getAllSpecialitiesCtrl = async (req, res) => {
 let result = null;
 try {
  result = await specialityServ.getAllSpecialitiesServ();
 } catch (error) {
  console.log('getAllSpecialitiesCtrl error ---', error);
 }

 return res.status(result.status).json(result);
};

export const createSpecialityCtrl = async (req, res) => {
 let isEmpty = false;
 let result = null;
 const newData = req.body;

 for (const key in newData) {
  if (newData[key] === '') {
   isEmpty = true;
   break;
  }
 }
 if (isEmpty === true || Object.keys(newData).length === 0) {
  result = apiStates.fieldRequired;
 } else {
  try {
   result = await specialityServ.createSpecialityServ(newData);
  } catch (error) {
   console.log('createSpecialityCtrl error ---', error);
  }
 }
 return res.status(result.status).json(result);
};
