import { apiStates } from '../supplies/apiSupplies';
import * as doctorServ from '../services/doctorServ';
import * as constVals from '../utilities/index';

export const sendBillToPatientEmailCtrl = async (req, res) => {
 let emailData = req.body;
 let result = apiStates.serverError;
 try {
  result = await doctorServ.sendBillToPatientEmailServ(emailData);
 } catch (error) {
  console.log('sendBillToPatientEmailCtrl error ---', error);
 }
 return res.status(result.status).json(result);
};

export const getPatientManagerByDoctorIdCtrl = async (req, res) => {
 const id = +req.query.id;
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === constVals.typeKeyValue.numType) {
  try {
   result = await doctorServ.getPatientManagerByDoctorIdServ(id);
  } catch (error) {
   console.log('getPatientManagerByDoctorIdCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const sendInfoToEmailCtrl = async (req, res) => {
 let emailData = req.body;
 let result = apiStates.serverError;

 try {
  result = await doctorServ.sendInfoToEmailServ(emailData);
 } catch (error) {
  console.log('sendInfoToEmailCtrl error ---', error);
 }

 return res.status(result.status).json(result);
};

export const getDoctorExtraInfoByIdForUiCtrl = async (req, res) => {
 const id = +req.query.id;
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === constVals.typeKeyValue.numType) {
  try {
   result = await doctorServ.getDoctorExtraInfoByIdForUiServ(id);
  } catch (error) {
   console.log('getDoctorExtraInfoByIdForUiCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const getDoctorExtraInfoByIdCtrl = async (req, res) => {
 const id = +req.query.id;
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === constVals.typeKeyValue.numType) {
  try {
   result = await doctorServ.getDoctorExtraInfoByIdServ(id);
  } catch (error) {
   console.log('getDoctorExtraInfoByIdCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const createDoctorExtraInfoByIdCtrl = async (req, res) => {
 let result = null;
 let newData = req.body;
 if (newData && typeof newData.id === constVals.typeKeyValue.numType) {
  result = {
   errCode: apiStates.incorrectInfo.errCode,
   errCode: apiStates.incorrectInfo.status,
   message: apiStates.incorrectInfo.mesGroup.id,
  };
 } else {
  try {
   result = await doctorServ.createDoctorExtraInfoByIdServ(newData);
  } catch (error) {
   console.log('createDoctorExtraInfoByIdCtrl error ---', error);
  }
 }

 return res.status(result.status).json(result);
};

export const getAllcodesExtraCtrl = async (req, res) => {
 let result = apiStates.serverError;

 try {
  result = await doctorServ.getAllcodesExtraServ();
 } catch (error) {
  console.log('getAllcodesExtraCtrl error', error);
 }

 return res.status(result.status).json(result);
};

export const getDoctorWorkdateByIdCtrl = async (req, res) => {
 const id = +req.query.id;

 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === constVals.typeKeyValue.numType) {
  try {
   result = await doctorServ.getDoctorWorkdateByIdServ(id);
  } catch (error) {
   console.log('getDoctorWorkdateByIdCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const getDoctorScheduleByIdCtrl = async (req, res) => {
 const id = +req.query.id;

 let result = apiStates.fieldRequired;
 const { numType } = constVals.typeKeyValue;

 if (id && typeof id === numType) {
  try {
   result = await doctorServ.getDoctorScheduleByIdServ(id);
  } catch (error) {
   console.log('getDoctorScheduleByIdCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const createDoctorScheduleCtrl = async (req, res) => {
 let result = null;
 let schedule = req.body;

 if (!Array.isArray(schedule)) {
  result = {
   errCode: apiStates.incorrectInfo.errCode,
   errCode: apiStates.incorrectInfo.status,
   message: apiStates.incorrectInfo.mesGroup.arr,
  };
 } else if (schedule && schedule.length === 0) {
  result = apiStates.fieldRequired;
 } else {
  try {
   result = await doctorServ.createDoctorScheduleServ(schedule);
  } catch (error) {
   console.log('createDoctorScheduleCtrl error ---', error);
  }
 }

 return res.status(result.status).json(result);
};

export const getScheduleRangeCtrl = async (req, res) => {
 let result = apiStates.serverError;
 try {
  result = await doctorServ.getScheduleRangeServ();
 } catch (error) {
  console.log('getScheduleRangeCtrl error ---', error);
 }
 return res.status(result.status).json(result);
};

export const getDoctorMarkdownByIdCtrl = async (req, res) => {
 const id = +req.query.id;
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === constVals.typeKeyValue.numType) {
  try {
   result = await doctorServ.getDoctorMarkdownByIdServ(id);
  } catch (error) {
   console.log('getDoctorMarkdownByIdCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const getDoctorIntroByIdCtrl = async (req, res) => {
 const id = +req.query.id;
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === constVals.typeKeyValue.numType) {
  try {
   result = await doctorServ.getDoctorIntroByIdServ(id);
  } catch (error) {
   console.log('getDoctorIntroByIdCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const getDoctorInfoByIdCtrl = async (req, res) => {
 const id = +req.query.id;
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === constVals.typeKeyValue.numType) {
  try {
   result = await doctorServ.getDoctorInfoByIdServ(id);
  } catch (error) {
   console.log('getDoctorInfoByIdCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const getDoctorContentByIdCtrl = async (req, res) => {
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  errCode: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 const id = +req.query.doctorId;
 if (id && typeof id === constVals.typeKeyValue.numType) {
  try {
   result = await doctorServ.getDoctorMarkdownServ(id);
  } catch (error) {
   console.log('getDoctorContentByIdCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const createDoctorMarkdownCtrl = async (req, res) => {
 const id = +req.body.doctorId;

 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  status: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === constVals.typeKeyValue.numType) {
  let isEmpty = false;
  const newData = req.body;

  for (const key in newData) {
   if (newData[key] === '' || newData[key] === null || newData[key] === undefined) {
    isEmpty = true;
   }
  }

  if (isEmpty) {
   result = apiStates.fieldRequired;
  } else {
   try {
    result = await doctorServ.createDoctorMarkdownServ(newData);
   } catch (error) {
    console.log('createDoctorMarkdownCtrl error', error);
   }
  }
 }

 return res.status(result.status).json(result);
};
