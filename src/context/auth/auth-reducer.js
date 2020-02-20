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
  LOAD_USER_SETTINGS,
  SET_AUTH_ERROR,
  RESET_PASSWORD,
  REGISTER_USER,
  DELETE_EMAIL,
  ADD_EMAIL
} from "../types";

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
  [RESET_PASSWORD]: (state, { payload }) => ({
    ...state,
    isPasswordReset: payload
  }),
  [CHECK_PIN_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  [SEND_PHONE_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  [SET_AUTH_ERROR]: (state, { payload }) => ({
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
  [REGISTER_USER]: (state, { payload }) => ({
    ...state,
    isUserRegister: payload
  }),
  [LOAD_USER_SETTINGS]: (state, { payload }) => ({
    ...state,
    isTelegram: payload
  }),
  [LOG_OUT]: (state, { payload }) => ({
    ...payload,
    isUserLoaded: true
  }),
  [DELETE_EMAIL]: (state, { payload }) => ({
    ...state,
    users: payload.newUsers,
    currentUser: payload.newCurrentUser
  }),
  [ADD_EMAIL]: (state, { payload }) => {
    return {
      ...state,
      currentUser: payload.newCurrentUser,
      users: payload.newUsers
    };
  },
  DEFAULT: state => state
};

export const authReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
