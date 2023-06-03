import db from '../models/index';
import { apiStates } from '../supplies/apiSupplies';

export const getClinicContentByIdServ = (id) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;

   const records = await db.clinics.findOne({
    where: { id },
    attributes: ['address', 'htmlDesc', 'name'],
   });

   if (records) {
    result = {
     ...apiStates.noErrors,
     records,
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getClinicByIdForSystemServ = (id) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;

   const records = await db.clinics.findOne({
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
   });

   if (records) {
    result = {
     ...apiStates.noErrors,
     records,
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getClinicListServ = () => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.serverError;

   const records = await db.clinics.findAll({
    attributes: ['id', 'name'],
   });

   if (records && records.length > 0) {
    result = {
     ...apiStates.noErrors,
     records,
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getAllClinicsServ = () => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.serverError;

   const records = await db.clinics.findAll({
    attributes: ['id', 'name', 'image'],
   });

   if (records && records.length > 0) {
    result = {
     ...apiStates.noErrors,
     records,
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const createOrUpdateClinicServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.noErrors;
   const id = newData.id;

   const [record, isCreate] = await db.clinics.findOrCreate({
    where: { id: id ? id : null },
    defaults: {
     ...newData,
     id: undefined,
    },
   });

   if (isCreate) {
    //done
   } else {
    const [isUpdate, record] = await db.clinics.update({ ...newData }, { where: { id } });
    if (isUpdate) {
     result = apiStates.noErrors;
    } else result = apiStates.notCreated;
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};
