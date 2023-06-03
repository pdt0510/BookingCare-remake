import * as tokenSupplies from '../supplies/tokenSupplies';
import * as apiSupplies from '../supplies/apiSupplies';
import * as constVals from '../utilities/index';
import db from '../models/index';
import * as userServs from '../services/userServ';

export const loginGoogleAccServ = (userInfo, res) => {
 return new Promise(async (resolve, reject) => {
  try {
   let result = apiSupplies.apiStates.notCreated;
   result = await userServs.loginUserServ(userInfo, true, res);

   if (result.errCode === constVals.defaultValues.noErrors) {
    const { id, roleId } = result.user;
    const payload = { id, roleId };
    const sessionToken = tokenSupplies.generateSessionTokenFn(payload);
    tokenSupplies.setCookieFn('sessionToken', sessionToken, res);

    result = {
     ...result,
     sessionToken,
    };
   } else {
    const idCol = 'id';
    const idMax = await db.users.max(idCol);
    const payload = {
     id: idMax + 1,
     roleId: 'R3', //patient role
    };

    const { refreshToken, sessionToken, accessToken } = constVals.nameKeysValues;
    const accessTokenVal = tokenSupplies.generateAccessTokenFn(payload);
    const refreshTokenVal = tokenSupplies.generateRefreshTokenFn(payload);
    const sessionTokenVal = tokenSupplies.generateSessionTokenFn(payload);

    const isCreated = await db.users.create(
     {
      email: userInfo.email,
      firstname: userInfo.given_name,
      lastname: userInfo.family_name,
      roleId: constVals.defaultKeys.patientRole,
      refreshTokenData: [{ refreshToken: refreshTokenVal }],
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

    if (isCreated._options.isNewRecord) {
     tokenSupplies.setCookieFn(sessionToken, sessionTokenVal, res);
     tokenSupplies.setCookieFn(refreshToken, refreshTokenVal, res);
     tokenSupplies.setCookieFn(accessToken, accessTokenVal, res);

     result = {
      ...apiSupplies.apiStates.noErrors,
      accessToken: accessTokenVal,
      refreshToken: refreshTokenVal,
      sessionToken: sessionTokenVal,
     };
    }
   }

   resolve(result);
  } catch (error) {
   reject(error);
  }
 });
};
