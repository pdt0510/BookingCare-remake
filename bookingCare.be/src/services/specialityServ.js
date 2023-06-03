import db from '../models/index';
import { apiStates } from '../supplies/apiSupplies';

export const getSpecialityAndDoctorByIdServ = (id) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;
   const record = await db.specialities.findAll({
    where: { id },
    attributes: ['name', 'image', 'htmlDesc'],

    include: [
     {
      model: db.doctor_infors,
      as: 'doctorInfoData',
      attributes: ['doctorId'],

      include: [
       {
        model: db.allcodes,
        as: 'provinceVal',
        attributes: ['valueEN', 'valueVI'],
       },
      ],
     },
    ],

    raw: true,
    nest: true,
   });

   if (record && record.length > 0) {
    result = {
     ...apiStates.noErrors,
     record,
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getAllSpecialitiesServ = () => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.serverError;

   const records = await db.specialities.findAll({
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

export const createSpecialityServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   let isFailed = false;
   let result = apiStates.noErrors;
   const specialityId = newData.id;

   if (specialityId) {
    const [isUpdate, record] = await db.specialities.update(
     { ...newData, id: undefined },
     { where: { id: specialityId } },
    );
    if (!isUpdate) isFailed = true;
   } else {
    const isCreate = await db.specialities.create(newData);
    if (!isCreate._options.isNewRecord) isFailed = true;
   }

   if (isFailed) result = apiStates.notCreated;

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};
