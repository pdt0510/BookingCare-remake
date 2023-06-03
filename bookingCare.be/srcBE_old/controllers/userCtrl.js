import { apiStates } from '../supplies/apiSupplies';
import * as userServs from '../services/userServ';
import Commons from '../utilities/Commons';
import * as constVals from '../utilities/index';
import jwt_decode from 'jwt-decode';

export const resetPasswordCtrl = async (req, res) => {
 let userInfo = req.body;
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  status: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.token,
 };

 const currentTime = Date.now() / 1000;
 const expTime = userInfo && userInfo.token ? await jwt_decode(userInfo.token).exp : 0;

 if (expTime && currentTime < expTime) {
  result = {
   errCode: apiStates.incorrectInfo.errCode,
   status: apiStates.incorrectInfo.status,
   message: apiStates.incorrectInfo.mesGroup.password,
  };
  const isPassword = await Commons.checkPasswordRegex(userInfo.password);

  if (isPassword) {
   try {
    result = await userServs.resetPasswordServ(userInfo);
   } catch (error) {
    console.log('resetPasswordCtrl error ---', error);
   }
  }
 }

 return res.status(result.status).json(result);
};

export const sendEmailToGetTokenCtrl = async (req, res) => {
 let email = req.body.email;

 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  status: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.email,
 };
 const isChecked = await Commons.checkEmailRegex(email);

 if (isChecked) {
  try {
   const emailData = req.body;
   result = await userServs.sendEmailToGetTokenServ(emailData);
  } catch (error) {
   console.log('sendEmailToGetTokenCtrl error ---', error);
  }
 }
 return res.status(result.status).json(result);
};

export const localPassportLoginCtrl = async (req, res, next) => {
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  status: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.account,
 };
 let isValid = true;
 const infoObj = req.body;
 const { email, password } = constVals.nameKeysValues;

 for (const key in infoObj) {
  if (key === email) {
   isValid = await Commons.checkEmailRegex(infoObj[key]);
  } else if (key === password) {
   isValid = await Commons.checkPasswordRegex(infoObj[key]);
  }
  if (isValid === false) {
   break;
  }
 }

 if (isValid) {
  try {
   result = await userServs.localPassportLoginServ(req, res, next);
  } catch (error) {
   console.log('localPassportLoginCtrl error', error);
  }
 }

 return res.status(result.status).json(result);
};

export const getUsersInPaginationCtrl = async (req, res) => {
 let result = apiStates.notCreated;
 const pageNumber = +req.query.pageNumber;

 if (pageNumber > 0 && typeof pageNumber === constVals.typeKeyValue.numType) {
  try {
   result = await userServs.getUsersInPaginationServ(pageNumber);
  } catch (error) {
   console.log('getUsersInPaginationCtrl error', error);
  }
 }

 return res.status(result.status).json(result);
};

export const clearAllCookiesByIdCtrl = async (req, res) => {
 let id = +req.body.id;

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
    result = await userServs.clearAllCookiesByIdServ(newData);
   } catch (error) {
    console.log('clearAllCookiesByIdCtrl error', error);
   }
  }
 }

 return res.status(result.status).json(result);
};

export const updateRefreshTokenCtrl = async (req, res) => {
 let id = +req.body.id;

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
    result = await userServs.updateRefreshTokenServ(newData);
   } catch (error) {
    console.log('updateUserByIdCtrl error', error);
   }
  }
 }

 return res.status(result.status).json(result);
};

export const createDoctorMarkdownCtrl = async (req, res) => {
 const id = +req.body.id;
 let result = {
  errCode: apiStates.incorrectInfo.errCode,
  status: apiStates.incorrectInfo.status,
  message: apiStates.incorrectInfo.mesGroup.id,
 };

 if (id && typeof id === 'number') {
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
    result = await userServs.createDoctorMarkdownServ(newData);
   } catch (error) {
    console.log('createDoctorMarkdownCtrl error', error);
   }
  }
 }

 return res.status(result.status).json(result);
};

export const getAllDoctorsCtrl = async (req, res) => {
 let result = null;
 try {
  result = await userServs.getAllDoctorsServ();
 } catch (error) {
  console.log('getAllDoctorsCtrl error', error);
 }
 return res.status(result.status).json(result);
};

export const getUserAllcodesCtrl = async (req, res) => {
 let result = null;
 try {
  result = await userServs.getUserAllcodesServ();
 } catch (error) {
  console.log('getUserAllcodesCtrl error', error);
 }
 return res.status(result.status).json(result);
};

export const getAllcodesCtrl = async (req, res) => {
 let result = null;
 try {
  result = await userServs.getAllcodesServ();
 } catch (error) {
  console.log('getAllcodesCtrl error', error);
 }
 return res.status(result.status).json(result);
};

export const updateUserByIdCtrl = async (req, res) => {
 let id = +req.body.id;

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
    result = await userServs.updateUserByIdServ(newData);
   } catch (error) {
    console.log('updateUserByIdCtrl error', error);
   }
  }
 }

 return res.status(result.status).json(result);
};

export const getUserByIdCtrl = async (req, res) => {
 let result = null;
 const id = +req.query.id;

 if (id && typeof id === 'number') {
  try {
   result = await userServs.getUserByIdServ(id);
  } catch (error) {
   console.log('getUserByIdCtrl error', error);
  }
 } else {
  result = {
   errCode: apiStates.incorrectInfo.errCode,
   errCode: apiStates.incorrectInfo.status,
   message: apiStates.incorrectInfo.mesGroup.id,
  };
 }
 return res.status(result.status).json(result);
};

export const deleteUserByIdCtrl = async (req, res) => {
 let id = +req.query.id;
 let result = apiStates.fieldRequired;

 if (id && typeof id === 'number') {
  try {
   result = await userServs.deleteUserByIdServ(id);
  } catch (error) {
   result = apiStates.serverError;
   console.log('deleteUserByIdCtrl error', error);
  }
 }

 return res.status(result.status).json(result);
};

export const createLocalAccCtrl = async (req, res) => {
 let result = null;
 let isValid = true;
 let isEmpty = false;
 const newData = req.body;
 const { email, password } = constVals.nameKeysValues;

 for (const key in newData) {
  if (newData[key] === null || newData[key] === undefined || newData[key] === '') {
   isEmpty = true;
   break;
  }

  if (key === email) {
   isValid = await Commons.checkEmailRegex(newData[key]);
   if (isValid === false) break;
  } else if (key === password) {
   isValid = await Commons.checkPasswordRegex(newData[key]);
   if (isValid === false) break;
  }
 }

 if (isEmpty) {
  result = apiStates.fieldRequired;
 } else if (isValid === false) {
  result = {
   errCode: apiStates.incorrectInfo.errCode,
   status: apiStates.incorrectInfo.status,
   message: apiStates.incorrectInfo.mesGroup.account,
  };
 } else {
  try {
   result = await userServs.createLocalAccServ(newData);
  } catch (error) {
   console.log('createLocalAccCtrl error', error);
  }
 }

 return res.status(result.status).json(result);
};

export const loginUserCtrl = async (req, res) => {
 let result = null;
 let isValid = true;
 const infoObj = req.body;
 const { email, password } = constVals.nameKeysValues;

 for (const key in infoObj) {
  if (key === email) {
   isValid = await Commons.checkEmailRegex(infoObj[key]);
  } else if (key === password) {
   isValid = await Commons.checkPasswordRegex(infoObj[key]);
  }
  if (isValid === false) {
   break;
  }
 }

 if (isValid === false) {
  result = {
   errCode: apiStates.incorrectInfo.errCode,
   status: apiStates.incorrectInfo.status,
   message: apiStates.incorrectInfo.mesGroup.account,
  };
 } else {
  try {
   result = await userServs.loginUserServ(infoObj, false, res);
  } catch (error) {
   console.log('loginUserCtrl error', error);
  }
 }
 return res.status(result.status).json(result);
};

export const getAllUsersCtrl = async (req, res) => {
 let result = null;
 try {
  result = await userServs.getAllUsersServ();
 } catch (error) {
  console.log('getAllUsersCtrl error', error);
 }
 return res.status(result.status).json(result);
};
