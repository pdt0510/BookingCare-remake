import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
 type: actionTypes.APP_START_UP_COMPLETE,
});

export const switchLanguage = () => ({
 type: actionTypes.SWITCH_LANGUAGE,
});

export const toggleLoadingGif = () => ({
 type: actionTypes.TOGGLE_LOADING,
});
