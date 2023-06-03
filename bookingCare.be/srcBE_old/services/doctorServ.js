import { apiStates } from '../supplies/apiSupplies';
import db from '../models/index';
import * as constVals from '../utilities/index';
import _ from 'lodash';
import * as emailServs from './emailService';

export const sendBillToPatientEmailServ = (info) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.serverError;
   const { id, doctorId, patientId } = info;
   const { statusOfConfirm, statusOfDone } = constVals.defaultKeys;

   const record = await db.bookings.findOne({
    where: {
     id: 5,
     doctorId,
     patientId,
     statusId: statusOfConfirm,
    },
   });

   if (record) {
    const [isUpdate, rest] = await db.bookings.update(
     { statusId: statusOfDone },
     {
      where: {
       id,
       patientId,
       statusId: statusOfConfirm,
      },
     },
    );

    if (isUpdate) {
     const { email, img } = info;

     const emailData = {
      clientEmail: email,
      clientSubject: `The bill to ${email}`,
      htmlText: `Hello! ${email}`,
      attachments: [
       {
        filename: `bill of ${email}.jepg`,
        path: img,
       },
      ],
     };

     //no 'await' to improve performance -> isCheck = Promise
     const isCheck = emailServs.sendEmailWithAttachment(emailData);
     if (isCheck) result = apiStates.noErrors;
    }
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getPatientManagerByDoctorIdServ = (doctorId) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;

   const records = await db.bookings
    .findAll({
     attributes: ['id', 'patientId', 'dateBooked'],
     where: { doctorId, statusId: constVals.defaultKeys.statusOfConfirm },

     include: [
      {
       model: db.users,
       as: 'patientInfoData',
       attributes: ['email', 'firstName', 'lastName', 'address', 'phoneNumber'],

       include: [
        {
         model: db.allcodes,
         as: 'genderData',
         attributes: ['valueEN', 'valueVI'],
        },
       ],
      },
      {
       model: db.allcodes,
       as: 'getTimetypeVal',
       attributes: ['valueEN', 'valueVI'],
      },
     ],
     raw: true,
     nest: true,
    })
    .then((res) => {
     const patientList = res.map((item) => {
      return {
       id: item.id,
       token: item.token,
       patientId: item.patientId,
       dateBooked: item.dateBooked,
       getStatusVal: item.getStatusVal,
       getTimetypeVal: item.getTimetypeVal,
       ...item.patientInfoData,
      };
     });

     return patientList;
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

export const sendInfoToEmailServ = (emailData) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.serverError;

   const checkEmail = await emailServs.sendEmailInfo(emailData);
   if (checkEmail && checkEmail.accepted.length > 0) {
    result = {
     ...apiStates.noErrors,
     message: 'Check your email for confirming',
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getDoctorExtraInfoByIdForUiServ = (doctorId) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = { ...apiStates.notFound };

   let record = await db.doctor_infors.findOne({
    where: { doctorId },
    attributes: ['clinicAddress', 'clinicName'],

    include: [
     {
      model: db.allcodes,
      as: 'getPriceValue',
      where: { type: constVals.typeKeyValue.priceType },
      attributes: ['valueEN', 'valueVI'],
     },
    ],
    raw: true,
    nest: true,
   });

   if (record) {
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

export const getDoctorExtraInfoByIdServ = (doctorId) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = { ...apiStates.notFound };

   let record = await db.doctor_infors.findOne({
    where: { doctorId },
    attributes: {
     exclude: ['createdAt', 'updatedAt', 'clinicId', 'count', 'id', 'doctorId'],
    },
   });

   if (record) {
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

export const createDoctorExtraInfoByIdServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.noErrors;
   const doctorId = newData.doctorId;

   const isCreated = await db.doctor_infors.findOrCreate({
    where: { doctorId },
    defaults: {
     ...newData,
     doctorId: undefined,
    },
   });

   const success = true;
   if (isCreated[1] === success) {
   } else {
    const isUpdated = 1;
    const record = await db.doctor_infors.update({ ...newData }, { where: { doctorId } });
    if (record[0] === isUpdated) {
     result = apiStates.noErrors;
    } else result = apiStates.notCreated;
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getAllcodesExtraServ = () => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = { ...apiStates.notFound };

   let records = await db.allcodes.findAll({
    where: { type: constVals.typeKeyValue.extraTypeList },
    attributes: ['type', 'keymap', 'valueEN', 'valueVI'],
   });

   if (records.length > 0) {
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

export const getDoctorWorkdateByIdServ = (doctorId) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = { ...apiStates.notFound, records: [] };

   let records = await db.schedules.findAll({
    where: { doctorId },
    attributes: ['workdate', 'timeType'],

    include: [
     {
      model: await db.allcodes,
      as: 'doctorWorkdateData',
      where: { type: constVals.typeKeyValue.timeType },
      attributes: ['valueEN'],
     },
    ],
    raw: true,
    nest: true,
   });

   if (records.length > 0) {
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

export const getDoctorScheduleByIdServ = (doctorId) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = { ...apiStates.notFound };

   let records = await db.schedules.findAll({
    where: { doctorId },
    attributes: ['id', 'doctorId', 'workdate', 'timeType'],
   });

   if (records.length > 0) {
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

export const createDoctorScheduleServ = (newSchedule) => {
 return new Promise(async (resolve, reject) => {
  try {
   const { incorrectInfo, noErrors } = apiStates;
   let result = {
    errCode: incorrectInfo.errCode,
    status: incorrectInfo.status,
    message: incorrectInfo.mesGroup.existed,
   };

   const doctorId = newSchedule[0].doctorId;
   const getResult = await getDoctorScheduleByIdServ(doctorId);
   const existedSchedule = getResult.records ? getResult.records : [];

   const bulkData = _.differenceWith(newSchedule, existedSchedule, (a, b) => {
    return a.timeType === b.timeType && a.workdate === b.workdate;
   });

   if (bulkData && bulkData.length > 0) {
    const records = await db.schedules.bulkCreate(bulkData);
    if (records) result = noErrors;
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getScheduleRangeServ = () => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = { ...apiStates.notFound };

   let records = await db.allcodes.findAll({
    where: { type: constVals.typeKeyValue.timeType },
    attributes: ['keymap', 'valueEN'],
   });

   if (records.length > 0) {
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

export const getDoctorMarkdownByIdServ = (id) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;

   const record = await db.markdowns.findOne({
    where: { doctorId: id },
    attributes: ['htmlContent'],
   });

   if (record) {
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

export const getDoctorIntroByIdServ = (id) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;

   const record = await db.users.findOne({
    where: { id },
    attributes: ['firstname', 'lastname', 'avatar'],

    include: [
     {
      model: db.markdowns,
      as: 'doctorMarkdownData',
      attributes: ['description'],
     },
     {
      model: db.doctor_infors,
      as: 'userInforData',
      attributes: ['priceId'],
      include: [
       {
        model: db.allcodes,
        as: 'getPriceValue',
        where: { type: constVals.typeKeyValue.priceType },
        attributes: ['valueEN', 'valueVI'],
       },
      ],
     },
    ],

    raw: true,
    nest: true,
   });

   if (record) {
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

export const getDoctorInfoByIdServ = (id) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;

   const record = await db.users.findOne({
    where: { id },
    attributes: ['firstname', 'lastname', 'avatar'],

    include: [
     {
      model: db.markdowns,
      as: 'doctorMarkdownData',
      attributes: ['htmlContent', 'textContent', 'description'],
     },
     {
      model: db.allcodes,
      as: 'genderData',
      attributes: ['valueEN', 'valueVI'],
     },
    ],

    raw: true,
    nest: true,
   });

   if (record) {
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

export const getDoctorMarkdownServ = (id) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;

   const record = await db.markdowns.findOne({
    where: { doctorId: id },
    attributes: ['htmlContent', 'textContent', 'description'],
   });

   if (record) {
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

export const createDoctorMarkdownServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   const success = true;
   const doctorId = newData.doctorId;
   let result = apiStates.notCreated;

   const isCreated = await db.markdowns.findOrCreate({
    where: { doctorId },
    defaults: {
     ...newData,
    },
   });

   if (isCreated[1] === success) {
    result = apiStates.noErrors;
   } else {
    const isUpdated = 1;
    const record = await db.markdowns.update({ ...newData }, { where: { doctorId } });
    if (record[0] === isUpdated) result = apiStates.noErrors;
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};
