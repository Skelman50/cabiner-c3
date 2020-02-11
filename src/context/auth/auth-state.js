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
  CHECK_PIN_ERROR,
  LOAD_USER_SETTINGS
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
  pinType: null,
  isTelegram: null
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
        url: "api/auth",
        data
      });
      if (response.data.dbUser && !response.data.Error) {
        dispatch({
          type: SEND_PHONE_SUCCESS,
          payload: response.data.dbUser
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
        url: "api/auth/login",
        data
      });
      if (response.data.passwordRes) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data.passwordRes
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
        url: "api/getpin",
        data
      });
      dispatch({
        type: GET_PIN_SUCCESS,
        payload: response.data
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
        url: "api/getpin/check",
        data
      });
      if (response.data.check) {
        localStorage.setItem("auth", response.data.refreshToken);
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

  const getContragentSettings = useCallback(async (data, token) => {
    try {
      const response = await request({
        method: "POST",
        token: token,
        url: "api/settings",
        data
      });
      dispatch({
        type: LOAD_USER_SETTINGS,
        payload: response.data.isTelegramAkk
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const token = localStorage.getItem("auth");
    const response = await request({ url: "check/refresh", token });
    const newToken = response.data.newRefreshToken;
    localStorage.setItem("auth", newToken);
    dispatch({ type: REFRESH_TOKEN, payload: newToken });
  }, []);

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth");
      const response = await request({ token, url: "check/control" });
      if (!response.data) {
        return logOut();
      }
      if (response.data.Result && !response.data.Error) {
        await refreshToken();
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: response.data.Result.map(item => ({
            ...item,
            phone: response.data.phone
          }))
        });
        setCurrentUser({
          ...response.data.Result[0],
          phone: response.data.phone
        });
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  }, [refreshToken]);

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
        getContragentSettings,
        checkPin,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AUthState;
