import React, { useReducer, useCallback } from "react";
import { request } from "../../utils/request";
import { ContractsContext } from "./contracts-context";
import {
  LOAD_CONTRACTS_SUCCESS,
  SET_LOADING_CONTRACTS,
  CLEAR_CONTRACTS,
  SET_CURRENT_CONTRACT,
  SET_PAY_AMOUNT
} from "../types";
import { contractsReducer } from "./contracts-reducer";

const ContractsState = ({ children }) => {
  const initialState = {
    contracts: [],
    loadingContracts: false,
    error: null,
    currentContract: null,
    payAmount: ""
  };
  const [state, dispatch] = useReducer(contractsReducer, initialState);

  const setLoading = payload => {
    dispatch({ type: SET_LOADING_CONTRACTS, payload });
  };

  const setPayAmount = payload => {
    dispatch({ type: SET_PAY_AMOUNT, payload });
  };

  const setCurrentContract = contract => {
    dispatch({ type: SET_CURRENT_CONTRACT, payload: contract });
  };

  const clearContracts = useCallback(() => {
    dispatch({
      type: CLEAR_CONTRACTS,
      payload: {
        contracts: [],
        loadingContracts: false,
        error: null
      }
    });
  }, []);

  const loadContracts = useCallback(async data => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth");
      const response = await request({
        token,
        url: "api/contracts",
        method: "POST",
        data
      });
      if (!response.data.Error) {
        dispatch({
          type: LOAD_CONTRACTS_SUCCESS,
          payload: response.data
        });
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ContractsContext.Provider
      value={{
        ...state,
        loadContracts,
        clearContracts,
        setCurrentContract,
        setPayAmount
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsState;
