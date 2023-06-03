import { applyMiddleware, legacy_createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './store/reducers/rootReducers';
import { logger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import { createStateSyncMiddleware } from 'redux-state-sync';
import actionTypes from './store/actions/actionTypes';

const middlewareList = [thunkMiddleware];
const environment = process.env.NODE_ENV || 'development';
let isDevelopment = environment === 'development' ? true : false;

isDevelopment = false;
const composeEnhancers =
 isDevelopment === true && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

if (isDevelopment) {
 middlewareList.push(logger);
}


const reduxStateSyncConfig = {
 whitelist: [actionTypes.APP_START_UP_COMPLETE],
};
middlewareList.push(createStateSyncMiddleware(reduxStateSyncConfig));

const reduxStore = legacy_createStore(
 rootReducers,
 composeEnhancers(applyMiddleware(...middlewareList)),
);
const persistor = persistStore(reduxStore);
const configureReduxStore = () => ({ reduxStore, persistor });

export default configureReduxStore;
