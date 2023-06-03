import * as varConsts from '../../utilities/constant';
import actionTypes from '../actions/actionTypes';

const { language, vi, en, isLoadingSymbol } = varConsts.nameKeysValues;
const initialState = {
 started: false,
 [language]: vi,
 [isLoadingSymbol]: false,
};

const appReducer = (state = initialState, action) => {
 const { type } = action;
 if (type === actionTypes.APP_START_UP_COMPLETE) {
  return {
   ...state,
   started: true,
  };
 }
 if (type === actionTypes.SWITCH_LANGUAGE) {
  return {
   ...state,
   [language]: state.language === varConsts.LANGUAGES.EN ? vi : en,
  };
 }
 if (type === actionTypes.TOGGLE_LOADING) {
  return {
   ...state,
   isLoadingSymbol: !state.isLoadingSymbol,
  };
 }
 return state;
};

export default appReducer;
