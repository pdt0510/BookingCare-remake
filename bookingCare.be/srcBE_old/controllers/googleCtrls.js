import 'dotenv/config';
import { google } from 'googleapis';
import * as apiSupplies from '../supplies/apiSupplies';
import * as ggServs from '../services/googleServ';

const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
 process.env.googleClientId,
 process.env.googleClientSecret,
 process.env.googleOauthRedirectUrl,
);

export const loginGoogleAccCtrl = async (req, res, next) => {
 const { code } = req.query;
 const { tokens } = await oAuth2Client.getToken(code); //await is needed
 oAuth2Client.setCredentials(tokens);

 const oauth2 = google.oauth2({
  auth: oAuth2Client,
  version: 'v2',
 });
 const { data: ggUser } = await oauth2.userinfo.get();
 let result = apiSupplies.apiStates.notCreated;

 if (ggUser && Object.keys(ggUser).length > 0) {
  try {
   result = await ggServs.loginGoogleAccServ(ggUser, res);
  } catch (error) {
   console.log('loginGoogleAccCtrl error', error);
  }
 }
 const { refreshToken, accessToken, sessionToken, user } = result;

 return res.redirect(
  `http://localhost:3000/loggedIn/accessToken=${accessToken}/refreshToken=${refreshToken}/sessionToken=${sessionToken}/user=${JSON.stringify(
   user,
  )}`,
 );
};

export const getGgOauth2UrlCtrl = async (req, res, next) => {
 try {
  const url = await oAuth2Client.generateAuthUrl({
   access_type: 'offline',
   scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
   ],
  });
  const result = { ...apiSupplies.apiStates.noErrors, url };
  return res.status(result.status).json(result);
 } catch (error) {
  console.log('getGgOauth2UrlCtrl error', error);
 }
};
