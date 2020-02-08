import React, { useReducer, useCallback } from "react";
import { authReducer } from "./auth-reducer";
import { AuthContext } from "./auth-context";
import {
  SET_LOADING_USER,
  LOAD_USER_SUCCESS,
  SET_CURRENT_USER
} from "../types";
import { request } from "../../utils/request";

const AUthState = ({ children }) => {
  const initialState = {
    currentUser: null,
    isUserLoaded: false,
    users: [],
    loadingUser: true,
    token: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setLoading = payload => {
    dispatch({ type: SET_LOADING_USER, payload });
  };

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth");
      const response = await request({ token, url: "loaduser" });
      if (response.data.response.Result && !response.data.response.Error) {
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: response.data.response.Result
        });
        setCurrentUser(response.data.response.Result[0]);
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  }, []);

  const setCurrentUser = payload => {
    dispatch({ type: SET_CURRENT_USER, payload });
  };

  return (
    <AuthContext.Provider value={{ ...state, loadUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AUthState;
