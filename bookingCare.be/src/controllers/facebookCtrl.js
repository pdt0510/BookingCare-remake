import 'dotenv/config';
import * as fbServs from '../services/facebookServ';
import * as apiSupplies from '../supplies/apiSupplies';
import 'dotenv/config';

export const LoginByFacebookCtrl = async (req, res, next) => {
 const profile = req.user;
 if (Object.keys(profile).length === 0) return res.end('Empty user');

 const userInfo = {
  id: profile.id,
  givenName: profile.name.givenName,
  familyName: profile.name.familyName,
  email: profile.email ? profile.email : `${profile.id}@fb.com`,
  gender: profile.gender,
 };

 const result = await fbServs.loginByFacebookServ(userInfo, res);

 if (result.errCode === 0) {
  const { user, accessToken, refreshToken, sessionToken } = result;
  return res.redirect(
   // `http://localhost:3000/loggedIn/accessToken=${accessToken}/refreshToken=${refreshToken}/sessionToken=${sessionToken}/user=${JSON.stringify(
   //  user,
   // )}`,

   /* .env */
   `${
    process.env.REACT_APP_REDIRECT_URL
   }/loggedIn/accessToken=${accessToken}/refreshToken=${refreshToken}/sessionToken=${sessionToken}/user=${JSON.stringify(
    user,
   )}`,
  );
 } else return res.end(result);
};
