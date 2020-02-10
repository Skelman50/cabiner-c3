import React, { useReducer, useCallback } from "react";
import { request } from "../../utils/request";
import { ContractsContext } from "./contracts-context";
import { LOAD_CONTRACTS_SUCCESS, SET_LOADING_CONTRACTS } from "../types";
import { contractsReducer } from "./contracts-reducer";

const ContractsState = ({ children }) => {
  const initialState = {
    contracts: [],
    loadingContracts: false,
    error: null
  };
  const [state, dispatch] = useReducer(contractsReducer, initialState);

  const setLoading = payload => {
    dispatch({ type: SET_LOADING_CONTRACTS, payload });
  };

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
    <ContractsContext.Provider value={{ ...state, loadContracts }}>
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsState;
