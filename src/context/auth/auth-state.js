import React, { useReducer, useCallback } from "react";
import { authReducer } from "./auth-reducer";
import { AuthContext } from "./auth-context";
import {
  SET_LOADING_USER,
  LOAD_USER_SUCCESS,
  SET_CURRENT_USER,
  REFRESH_TOKEN,
  LOG_OUT,
  SEND_PHONE_SUCCESS,
  SEND_PHONE_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_PIN_SUCCESS,
  CHECK_PIN_ERROR
} from "../types";
import { request } from "../../utils/request";

export const initialStateAuth = {
  currentUser: null,
  isUserLoaded: null,
  users: [],
  loadingUser: false,
  isLoggedIn: null,
  token: null,
  isFormLoading: false,
  isPhoneVerify: null,
  dbUser: null,
  isPassword: null,
  pinStatus: null,
  pinTimeout: null,
  pinType: null
};

const AUthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialStateAuth);

  const setLoading = payload => {
    dispatch({ type: SET_LOADING_USER, payload });
  };

  const sendPhone = async data => {
    try {
      setLoading(true);
      const response = await request({
        method: "POST",
        url: "sendphone",
        data
      });
      if (response.data.response.dbUser && !response.data.response.Error) {
        dispatch({
          type: SEND_PHONE_SUCCESS,
          payload: response.data.response.dbUser
        });
      } else {
        dispatch({
          type: SEND_PHONE_ERROR,
          payload: `Цей номер не верифікований.
        Перевірте правильність введення номера або
        зверніться до свого менеджера для його верифікації.`
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async data => {
    try {
      setLoading(true);
      const response = await request({
        method: "POST",
        url: "login",
        data
      });
      if (response.data.response.passwordRes) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data.response.passwordRes
        });
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: `Пароль невірний!`
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPin = useCallback(async data => {
    try {
      setLoading(true);
      const response = await request({
        method: "POST",
        url: "getpin",
        data
      });
      dispatch({
        type: GET_PIN_SUCCESS,
        payload: response.data.response
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkPin = async data => {
    try {
      setLoading(true);
      const response = await request({
        method: "POST",
        url: "checkpin",
        data
      });
      if (response.data.response.check) {
        localStorage.setItem("auth", response.data.response.token);
        await loadUser();
      } else {
        dispatch({ type: CHECK_PIN_ERROR, payload: "Ви ввели невірний PIN" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    const token = localStorage.getItem("auth");
    const response = await request({ url: "refreshtoken", token });
    const newToken = response.data.response.newRefreshToken;
    localStorage.setItem("auth", newToken);
    dispatch({ type: REFRESH_TOKEN, payload: newToken });
  };

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth");
      const response = await request({ token, url: "loaduser" });
      if (!response.data.response) {
        return logOut();
      }
      if (response.data.response.Result && !response.data.response.Error) {
        await refreshToken();
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

  const logOut = () => {
    localStorage.removeItem("auth");
    dispatch({ type: LOG_OUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loadUser,
        setCurrentUser,
        logOut,
        sendPhone,
        login,
        getPin,
        checkPin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AUthState;
