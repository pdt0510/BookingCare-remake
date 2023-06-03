import express from 'express';
import * as apiSupplies from '../supplies/apiSupplies';
import { getGgOauth2UrlCtrl, loginGoogleAccCtrl } from './../controllers/googleCtrls';

const ggRoutes = express.Router();
const { getGgOauth2UrlApi, ggCallbackUrl } = apiSupplies.urls;

const initGgRoutes = (app) => {
 ggRoutes.get(getGgOauth2UrlApi, getGgOauth2UrlCtrl);
 ggRoutes.get(ggCallbackUrl, loginGoogleAccCtrl);
 return app.use(ggRoutes);
};

export default initGgRoutes;
