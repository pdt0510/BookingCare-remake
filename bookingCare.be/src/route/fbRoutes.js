import 'dotenv/config';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import express from 'express';
import { LoginByFacebookCtrl } from './../controllers/facebookCtrl';
import * as apiSupplies from '../supplies/apiSupplies';

const fbRoutes = express.Router();
const { getFbOauth2UrlApi, fbCallbackUrl } = apiSupplies.urls;

const initfbRoute = (app) => {
 fbRoutes.use(passport.initialize());
 fbRoutes.use(passport.session());
 passport.serializeUser(function (user, doneCallback) {
  process.nextTick(function () {
   return doneCallback(null, user);
  });
 });
 passport.deserializeUser(function (user, doneCallback) {
  process.nextTick(function () {
   return doneCallback(null, user);
  });
 });
 passport.use(
  new FacebookStrategy(
   {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: process.env.FB_APP_CALLBACK_URL,
    profileFields: ['picture', 'gender', 'emails', 'birthday', 'name'],
   },

   (accessToken, refreshToken, profile, doneCallback) => {
    if (profile.id) {
     return doneCallback(null, profile);
    }
    return doneCallback(null, {}); //non-existed
   },
  ),
 );

 fbRoutes.get(
  getFbOauth2UrlApi,
  passport.authenticate('facebook', {
   authType: 'reauthenticate',
   scope: ['email', 'public_profile'],
  }),
 );

 fbRoutes.get(
  fbCallbackUrl,
  passport.authenticate('facebook', { failureRedirect: getFbOauth2UrlApi }),
  LoginByFacebookCtrl,
 );

 return app.use(fbRoutes);
};

export default initfbRoute;
