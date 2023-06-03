import { apiStates } from '../supplies/apiSupplies';
import db from '../models/index';
import bcrypt from 'bcrypt';
import * as constVals from '../utilities/index';
import * as tokenFns from '../supplies/tokenSupplies';
import { Op } from 'sequelize';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as emailServs from './emailService';

export const resetPasswordServ = (userInfo) => {
 return new Promise(async (resolve, reject) => {
  try {
   const success = 1;
   let result = apiStates.notFound;
   const { id, password, token } = userInfo;
   const hashedPassword = await convertToHashedPassword(password);

   //src32xx1
   const [isUpdate] = await db.users.update(
    { password: hashedPassword, resetPasswordToken: null },
    { where: { id, resetPasswordToken: token } },
   );

   if (isUpdate === success) result = apiStates.noErrors;

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const sendEmailToGetTokenServ = (emailData) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;
   const success = 1;
   const timeLimited = '100m';
   const email = emailData.email;

   const user = await db.users.findOne({
    where: { email },
    attributes: ['id'],
   });

   if (user && user.id) {
    const resetPasswordToken = tokenFns.generatePasswordTokenFn({ id: user.id }, timeLimited);

    const [isUpdate] = await db.users.update(
     { resetPasswordToken: resetPasswordToken },
     { where: { id: user.id, email } },
    );

    if (isUpdate === success) {
     const isResetPassword = true;
     const emailDataFormatted = {
      emailInfo: {
       clientEmail: emailData.email,
       timeLimited,
       resetPasswordToken,
       enlang: emailData.enlang,
      },
      clientEmail: emailData.email,
     };
     const isSent = await emailServs.sendEmailInfo(emailDataFormatted, isResetPassword);
     if (isSent) result = apiStates.noErrors;
    }
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const localPassportLoginServ = async (req, res, next) => {
 return new Promise(async (resolve, reject) => {
  try {
   passport.use(
    new LocalStrategy(
     { usernameField: constVals.nameKeysValues.email },
     async (email, password, done) => {
      await db.users
       .findAll({
        where: { email },
        attributes: ['id', 'email', 'password', 'firstname', 'lastname', 'roleId'],

        include: [
         {
          model: db.refreshtokens,
          as: 'refreshTokenData',
          attributes: ['refreshToken'],
          where: { deleted: constVals.defaultValues.noDelete },
         },
        ],
        raw: true,
        nest: true,
       })
       .then(async (data) => {
        if (!data || (data && data.length === 0)) done(null, false);
        else {
         const isMatched = await checkPassword(password, data[0].password);
         if (!isMatched) done(null, false);
         else {
          let userInfo = null;
          const refreshTokenList = data.map((item) => {
           if (!userInfo) {
            userInfo = {
             id: item.id,
             email: item.email,
             password: item.password,
             firstname: item.firstname,
             lastname: item.lastname,
             roleId: item.roleId,
            };
           }
           return item.refreshTokenData.refreshToken;
          });
          done(null, { ...userInfo, refreshTokenList });
         }
        }
       })
       .catch((err) => done(err));
     },
    ),
   );

   passport.authenticate('local', function (err, user) {
    let result = {
     errCode: apiStates.incorrectInfo.errCode,
     status: apiStates.incorrectInfo.status,
     message: apiStates.incorrectInfo.mesGroup.account,
    };
    if (err) return res.status(result.status).json(err);
    if (!user) return res.status(result.status).json(result);

    const { id, roleId, refreshTokenList } = user;
    const payload = { id, roleId };
    const accessToken = tokenFns.generateAccessTokenFn(payload);
    const lastRefreshToken =
     refreshTokenList.length > 0 ? refreshTokenList[refreshTokenList.length - 1] : null;

    if (lastRefreshToken) {
     tokenFns.setCookieFn(constVals.nameKeysValues.refreshToken, lastRefreshToken, res);
    }

    result = {
     ...apiStates.noErrors,
     user: {
      ...user,
      refreshTokenList: undefined,
      password: undefined,
     },
     accessToken,
    };

    resolve(result);
   })(req, res, next);
  } catch (error) {
   reject(error);
  }
 });
};

export const getUsersInPaginationServ = (pageNumber) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notCreated;
   const quantitiesLimited = 3;
   const start = (pageNumber - 1) * quantitiesLimited;

   const users = await db.users.findAll({
    offset: start,
    limit: quantitiesLimited,
    attributes: { exclude: ['password', 'avatar', 'createdAt', 'updatedAt'] },
   });

   if (users) {
    result = {
     ...apiStates.noErrors,
     users,
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const clearAllCookiesByIdServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   const userId = newData.id;
   let result = apiStates.noErrors;

   const user = await db.refreshtokens.findAll({
    where: { userId, deleted: constVals.defaultValues.noDelete },
    attributes: ['id'],
   });

   if (user && user.length > 0) {
    const unUpdatedForId = user[user.length - 1].id;

    const [isUpdate, rest] = await db.refreshtokens.update(
     { deleted: constVals.defaultValues.deleted },
     {
      where: {
       userId,
       id: { [Op.ne]: unUpdatedForId },
       deleted: constVals.defaultValues.noDelete,
      },
     },
    );

    const notUpdated = 0;
    if (isUpdate === notUpdated) result = apiStates.not;
   } else result = apiStates.notFound;

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const updateRefreshTokenServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   const userId = newData.id;
   let result = apiStates.notFound;
   const user = await db.refreshtokens.findOne({ where: { userId } });

   if (user) {
    const isCreated = await db.refreshtokens.create({ userId, refreshToken: newData.refreshToken });
    if (isCreated._options.isNewRecord) result = apiStates.noErrors;
    else result = apiStates.notCreated;
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getAllDoctorsServ = () => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.serverError;
   const { doctorRole } = constVals.defaultKeys;

   const records = await db.users.findAll({
    where: { roleId: doctorRole },
    attributes: ['id', 'firstname', 'lastname', 'avatar'],
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

export const getUserAllcodesServ = () => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.serverError;
   const { roleType, genderType, positionType } = constVals.typeKeyValue;

   const records = await db.allcodes.findAll({
    where: { type: [roleType, positionType, genderType] },
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

export const getAllcodesServ = () => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.serverError;
   const records = await db.allcodes.findAll({
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

export const updateUserByIdServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   const id = newData.id;
   let result = apiStates.notCreated;

   const user = await db.users.findOne({
    where: { id },
   });

   if (user) {
    const hashedPassword = await convertToHashedPassword(newData.password);
    const success = 1;
    const dataForUpdate = {
     ...newData,
     id: undefined,
     password: hashedPassword,
    };

    const isChecked = await db.users.update(dataForUpdate, {
     where: { id },
    });
    result =
     isChecked[0] === success
      ? { ...apiStates.noErrors, accessToken: newData.accessToken }
      : apiStates.notCreated;
   } else {
    result = apiStates.notFound;
   }
   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getUserByIdServ = (id) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;

   const user = await db.users.findOne({
    where: { id },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
   });

   if (user) {
    result = {
     ...apiStates.noErrors,
     user,
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const deleteUserByIdServ = (id) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notFound;

   const user = await db.users.findOne({
    where: { id },
    attributes: ['id'],
   });

   if (user) {
    const isdeleted = await db.users.destroy({
     where: { id },
    });

    const success = 1;
    if (isdeleted === success) {
     result = apiStates.noErrors;
    }
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const createLocalAccServ = (newData) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notCreated;

   const user = await db.users.findOne({
    where: { email: newData.email },
   });

   if (user) {
    result = {
     errCode: apiStates.incorrectInfo.errCode,
     status: apiStates.incorrectInfo.status,
     message: apiStates.incorrectInfo.mesGroup.existed,
    };
   } else {
    const idCol = 'id';
    const idMax = await db.users.max(idCol);
    const hashedPassword = await convertToHashedPassword(newData.password);
    const payload = {
     id: idMax + 1,
     roleId: newData.roleId,
    };
    const refreshToken = tokenFns.generateRefreshTokenFn(payload);

    const isCreated = await db.users.create(
     {
      ...newData,
      password: hashedPassword,
      refreshTokenData: [{ refreshToken }],
     },
     {
      include: [
       {
        model: db.refreshtokens,
        as: 'refreshTokenData',
       },
      ],
     },
    );

    if (isCreated._options.isNewRecord) result = apiStates.noErrors;
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const loginUserServ = (userInfo, from3rd = false, res) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = {
    errCode: apiStates.incorrectInfo.errCode,
    status: apiStates.incorrectInfo.status,
    message: apiStates.incorrectInfo.mesGroup.account,
   };

   const user = await db.users.findOne({
    where: { email: userInfo.email },
    attributes: ['id', 'email', 'password', 'firstname', 'lastname', 'roleId'],
   });

   if (user) {
    const records = await db.refreshtokens
     .findAll({
      where: { userId: user.id, deleted: constVals.defaultValues.noDelete },
      attributes: ['refreshToken'],
     })
     .then((res) => {
      const userInfo = {
       id: user.id,
       email: user.email,
       password: user.password,
       firstname: user.firstname,
       lastname: user.lastname,
       roleId: user.roleId,
      };

      const refreshTokenList = res.map((item) => {
       return item.refreshToken;
      });

      return {
       ...userInfo,
       refreshTokenList,
      };
     });

    const isMatched = from3rd ? true : await checkPassword(userInfo.password, records.password);
    if (isMatched) {
     const { refreshTokenList } = records;
     const payload = { id: records.id, roleId: records.roleId };
     const accessTokenVal = tokenFns.generateAccessTokenFn(payload);
     const lastRefreshTokenVal =
      refreshTokenList.length > 0 ? refreshTokenList[records.refreshTokenList.length - 1] : null;

     tokenFns.setCookieFn(constVals.nameKeysValues.accessToken, accessTokenVal, res);
     if (lastRefreshTokenVal)
      tokenFns.setCookieFn(constVals.nameKeysValues.refreshToken, lastRefreshTokenVal, res);

     result = {
      ...apiStates.noErrors,
      user: {
       ...records,
       refreshTokenList: undefined,
       password: undefined,
      },
      refreshToken: lastRefreshTokenVal,
      accessToken: accessTokenVal,
     };
    }
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

export const getAllUsersServ = () => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiStates.notCreated;
   const users = await db.users.findAll({
    attributes: { exclude: ['password', 'avatar', 'createdAt', 'updatedAt'] },
   });

   if (users) {
    result = {
     ...apiStates.noErrors,
     users,
    };
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};

const convertToHashedPassword = (password) => {
 return new Promise((resolve, reject) => {
  try {
   const saltRounds = 10;
   const hashed = bcrypt.hashSync(password, saltRounds);
   resolve(hashed);
  } catch (error) {
   reject(error);
  }
 });
};

const checkPassword = (password, hashed) => {
 return new Promise(async (resolve, reject) => {
  try {
   const isChecked = await bcrypt.compare(password, hashed);
   resolve(isChecked);
  } catch (error) {
   reject(error);
  }
 });
};
