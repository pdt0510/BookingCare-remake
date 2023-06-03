import { apiStates } from '../supplies/apiSupplies';
import * as constVals from '../utilities';
import db from '../models/index';

export const getPatientTokenForConfirmServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   const { doctorId, token } = newData;
   let result = apiStates.notFound;

   const record = await db.bookings.findOne({
    where: {
     doctorId: doctorId,
     token: token,
    },
   });

   if (record) {
    const { statusOfConfirm, statusOfNew } = constVals.defaultKeys;

    if (record.statusId === statusOfConfirm) {
     result = {
      errCode: apiStates.incorrectInfo.errCode,
      status: apiStates.incorrectInfo.status,
      message: apiStates.incorrectInfo.mesGroup.isActived,
     };
    } else {
     const [isUpdate, record] = await db.bookings.update(
      { statusId: statusOfConfirm },
      {
       where: {
        token: token,
        doctorId: doctorId,
        statusId: statusOfNew,
       },
      },
     );

     if (isUpdate) result = apiStates.noErrors;
    }
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const createABookingByDoctorIdServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.noErrors;
   const patientId = newData.patientId;
   const dateBooked = newData.dateBooked;

   const [record, isCreated] = await db.bookings.findOrCreate({
    where: { patientId, dateBooked },
    defaults: {
     ...newData,
    },
   });

   if (!isCreated) {
    result = {
     ...apiStates.notCreated, // existed record
     message: "it's not created, because you booked same date!",
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};
