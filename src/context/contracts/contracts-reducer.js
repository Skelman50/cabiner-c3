import {
  LOAD_CONTRACTS_SUCCESS,
  SET_LOADING_CONTRACTS,
  LOAD_CONTRACTS_ERROR,
  CLEAR_CONTRACTS
} from "../types";

const handlers = {
  [LOAD_CONTRACTS_SUCCESS]: (state, { payload }) => ({
    ...state,
    contracts: payload
  }),
  [SET_LOADING_CONTRACTS]: (state, { payload }) => ({
    ...state,
    loadingContracts: payload,
    error: payload ? null : state.error
  }),
  [CLEAR_CONTRACTS]: (state, { payload }) => ({
    ...payload
  }),
  [LOAD_CONTRACTS_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  }),
  DEFAULT: state => state
};

export const contractsReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
