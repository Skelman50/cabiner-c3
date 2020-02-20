import React, { useReducer, useCallback, useContext } from "react";
import { request } from "../../utils/request";
import { ContractsContext } from "./contracts-context";
import {
  LOAD_CONTRACTS_SUCCESS,
  SET_LOADING_CONTRACTS,
  CLEAR_CONTRACTS,
  SET_CURRENT_CONTRACT,
  SET_PAY_AMOUNT,
  CREATE_CHECKOUT_DATA,
  LOAD_CONTRACTS_ERROR
} from "../types";
import { contractsReducer } from "./contracts-reducer";
import { AuthContext } from "../auth/auth-context";

const ContractsState = ({ children }) => {
  const initialState = {
    contracts: [],
    loadingContracts: false,
    error: null,
    currentContract: null,
    payAmount: "",
    checkoutData: null
  };
  const [state, dispatch] = useReducer(contractsReducer, initialState);
  const { currentUser, token, logOut } = useContext(AuthContext);

  const setLoading = payload => {
    dispatch({ type: SET_LOADING_CONTRACTS, payload });
  };

  const setPayAmount = useCallback(payload => {
    dispatch({ type: SET_PAY_AMOUNT, payload });
  }, []);

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

  const createCheckOut = async () => {
    const data = {
      Ref_Key: state.currentContract.Ref_Key,
      Organization_Ref_Key: state.currentContract.Organization_Ref_Key,
      contragentKey: currentUser.Ref_Key,
      contragentName: currentUser.fullname,
      number: state.currentContract.number,
      amount: state.payAmount
    };
    setLoading(true);
    try {
      const response = await request({
        url: `api/liqpay/createSignature/${currentUser.phone}`,
        data,
        method: "POST",
        token: token
      });
      if (!response.data.error) {
        createSignature(response.data);
      } else {
        dispatch({
          type: LOAD_CONTRACTS_ERROR,
          payload:
            "Не вдалося створити платіж. Сума не може бути 0 або меншою за нуль!"
        });
      }
    } catch (error) {
      logOut();
    } finally {
      setLoading(false);
    }
  };

  const setError = useCallback(payload => {
    dispatch({ type: LOAD_CONTRACTS_ERROR, payload });
  }, []);

  const createSignature = useCallback(payload => {
    dispatch({ type: CREATE_CHECKOUT_DATA, payload });
  }, []);

  const loadContracts = useCallback(
    async data => {
      try {
        setLoading(true);
        const token = localStorage.getItem("auth");
        const response = await request({
          token,
          url: "api/contracts",
          method: "POST",
          data
        });
        if (!response.data.Error && !response.data.error) {
          dispatch({
            type: LOAD_CONTRACTS_SUCCESS,
            payload: response.data
          });
        }
      } catch (error) {
        logOut();
      } finally {
        setLoading(false);
      }
    },
    [logOut]
  );

  return (
    <ContractsContext.Provider
      value={{
        ...state,
        loadContracts,
        clearContracts,
        setCurrentContract,
        setPayAmount,
        createCheckOut,
        createSignature,
        setError
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};

export default ContractsState;
