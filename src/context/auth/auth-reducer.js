import {
  LOAD_USER_SUCCESS,
  SET_LOADING_USER,
  LOAD_USER_ERROR,
  SET_CURRENT_USER,
  REFRESH_TOKEN,
  LOG_OUT,
  SEND_PHONE_SUCCESS,
  SEND_PHONE_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_PIN_SUCCESS,
  CHECK_PIN_ERROR,
  LOAD_USER_SETTINGS
} from "../types";
import { initialStateAuth } from "./auth-state";

const handlers = {
  [LOAD_USER_SUCCESS]: (state, { payload }) => ({
    ...state,
    users: payload,
    isUserLoaded: true,
    isLoggedIn: true,
    error: null
  }),
  [SEND_PHONE_SUCCESS]: (state, { payload }) => ({
    ...state,
    isPhoneVerify: true,
    dbUser: payload,
    error: null
  }),
  [LOGIN_SUCCESS]: (state, { payload }) => ({
    ...state,
    isPassword: payload,
    error: null
  }),
  [LOGIN_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  [CHECK_PIN_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  [SEND_PHONE_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  [GET_PIN_SUCCESS]: (state, { payload }) => ({
    ...state,
    pinStatus: payload.status,
    pinTimeout: payload.timeOut,
    pinType: payload.typeSend,
    error: null
  }),
  [SET_CURRENT_USER]: (state, { payload }) => ({
    ...state,
    currentUser: payload
  }),
  [SET_LOADING_USER]: (state, { payload }) => ({
    ...state,
    loadingUser: payload
    // error: payload ? null : state.error
  }),
  [REFRESH_TOKEN]: (state, { payload }) => ({
    ...state,
    token: payload
  }),
  [LOAD_USER_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload,
    isUserLoaded: true
  }),
  [SET_CURRENT_USER]: (state, { payload }) => ({
    ...state,
    currentUser: payload
  }),
  [LOAD_USER_SETTINGS]: (state, { payload }) => ({
    ...state,
    isTelegram: payload
  }),
  [LOG_OUT]: () => ({
    ...initialStateAuth,
    isUserLoaded: true
  }),
  DEFAULT: state => state
};

export const authReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
