import {
  LOAD_USER_SUCCESS,
  SET_LOADING_USER,
  LOAD_USER_ERROR,
  SET_CURRENT_USER
} from "../types";

const handlers = {
  [LOAD_USER_SUCCESS]: (state, { payload }) => ({
    ...state,
    users: payload,
    isUserLoaded: true
  }),
  [SET_LOADING_USER]: (state, { payload }) => ({
    ...state,
    loadingUser: payload,
    error: payload ? null : state.error
  }),
  [LOAD_USER_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  [SET_CURRENT_USER]: (state, { payload }) => ({
    ...state,
    currentUser: payload
  }),
  DEFAULT: state => state
};

export const authReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
