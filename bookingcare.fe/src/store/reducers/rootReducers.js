import { combineReducers } from 'redux';
import userReducer from './userReducer';
import appReducer from './appReducer';
import adminReducer from './adminReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { nameKeysValues } from '../../utilities/constant';

const { user, isLoggedIn, userInfo, app, language, accessToken } = nameKeysValues;

const commonPersistConfig = {
 storage,
 stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
 ...commonPersistConfig,
 key: user,
 whitelist: [isLoggedIn, userInfo, accessToken],
};

const appPersistConfig = {
 ...commonPersistConfig,
 key: app,
 whitelist: [language],
};

const rootReducers = combineReducers({
 userReducer: persistReducer(userPersistConfig, userReducer),
 appReducer: persistReducer(appPersistConfig, appReducer),
 adminReducer,
});

export default rootReducers;
