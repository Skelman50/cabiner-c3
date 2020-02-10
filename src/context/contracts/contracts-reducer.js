import {
  LOAD_CONTRACTS_SUCCESS,
  SET_LOADING_CONTRACTS,
  LOAD_CONTRACTS_ERROR,
  CLEAR_CONTRACTS,
  SET_CURRENT_CONTRACT,
  SET_PAY_AMOUNT
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
    ...state,
    ...payload
  }),
  [SET_CURRENT_CONTRACT]: (state, { payload }) => ({
    ...state,
    currentContract: payload
  }),
  [SET_PAY_AMOUNT]: (state, { payload }) => ({
    ...state,
    payAmount: payload
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
