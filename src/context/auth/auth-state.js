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
  LOAD_USER_SETTINGS,
  SET_AUTH_ERROR,
  RESET_PASSWORD,
  REGISTER_USER,
  DELETE_EMAIL,
  ADD_EMAIL
} from "../types";
import { request } from "../../utils/request";
import { sleep } from "../../utils/sleep";

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
  isTelegram: null,
  isPasswordReset: false
};

const AUthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialStateAuth);

  const setLoading = payload => {
    dispatch({ type: SET_LOADING_USER, payload });
  };

  const logOut = useCallback(() => {
    localStorage.removeItem("auth");
    dispatch({ type: LOG_OUT, payload: initialStateAuth });
  }, []);

  const sendPhone = async data => {
    try {
      setLoading(true);
      const response = await request({
        method: "POST",
        url: "api/auth",
        data
      });
      if (!response.data.Error) {
        if (response.data.dbUser) {
          dispatch({
            type: SEND_PHONE_SUCCESS,
            payload: "yes"
          });
        } else {
          dispatch({
            type: SEND_PHONE_SUCCESS,
            payload: "no"
          });
        }
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

  const checkPin = async (data, dataForRegister) => {
    try {
      setLoading(true);
      const response = await request({
        method: "POST",
        url: "api/getpin/check",
        data
      });
      if (response.data.check) {
        if (!dataForRegister.isForgotPassword && !dataForRegister.isRegister) {
          localStorage.setItem("auth", response.data.refreshToken);
          await loadUser();
        } else if (dataForRegister.isForgotPassword) {
          const result = await registerUser({
            password: dataForRegister.password,
            isForgotPassword: "forgot",
            phonenumber: `+${data.phonenumber}`
          });
          if (result.data.save) {
            localStorage.setItem("auth", response.data.refreshToken);
            await loadUser();
            setIsPasswordReset(true);
          } else {
            setAuthError("Не вдалося змінити пароль, спробуйте ще раз!");
          }
        } else if (dataForRegister.isRegister) {
          const result = await registerUser({
            password: dataForRegister.password,
            isForgotPassword: null,
            phonenumber: `+${data.phonenumber}`
          });
          if (result.data.save) {
            localStorage.setItem("auth", response.data.refreshToken);
            await loadUser();
            setIsUserRegister(true);
          } else {
            setAuthError(
              "Не вдалося зареєструвати користоувача, спробуйте ще раз!"
            );
          }
        }
      } else {
        dispatch({ type: CHECK_PIN_ERROR, payload: "Ви ввели невірний PIN" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setIsPasswordReset = payload => {
    dispatch({ type: RESET_PASSWORD, payload });
  };

  const setIsUserRegister = payload => {
    dispatch({ type: REGISTER_USER, payload });
  };

  const registerUser = async data => {
    return await request({ data, url: "api/auth/register", method: "POST" });
  };

  const getContragentSettings = useCallback(
    async (data, token) => {
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
        logOut();
      }
    },
    [logOut]
  );

  const refreshToken = useCallback(async () => {
    const token = localStorage.getItem("auth");
    try {
      const response = await request({ url: "check/refresh", token });
      const newToken = response.data.newRefreshToken;
      localStorage.setItem("auth", newToken);
      dispatch({ type: REFRESH_TOKEN, payload: newToken });
    } catch (error) {
      logOut();
    }
  }, [logOut]);

  const setAuthError = payload => {
    dispatch({ type: SET_AUTH_ERROR, payload });
  };

  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth");
      const response = await request({ token, url: "check/control" });
      if (!response.data) {
        return logOut();
      }
      if (response.data.Result && !response.data.Error) {
        await sleep();
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
      logOut();
    } finally {
      setLoading(false);
    }
  }, [refreshToken, logOut]);

  const setCurrentUser = payload => {
    dispatch({ type: SET_CURRENT_USER, payload });
  };

  const deleteEmail = useCallback(({ email, users, currentUser }) => {
    const newEmailsList = currentUser.e_mail.filter(e => e !== email);
    const newCurrentUser = { ...currentUser, e_mail: newEmailsList };
    const newUsers = users.map(user => {
      if (user.Ref_Key === currentUser.Ref_Key) {
        user.e_mail = newEmailsList;
      }
      return user;
    });
    dispatch({ type: DELETE_EMAIL, payload: { newUsers, newCurrentUser } });
  }, []);

  const addEmail = useCallback(
    ({ email, refKey }) => {
      const newCurrentUser = { ...state.currentUser };
      if (newCurrentUser.Ref_Key === refKey) {
        newCurrentUser.e_mail = [...newCurrentUser.e_mail, email];
      }

      const newUsers = state.users.map(user => {
        if (user.Ref_Key === refKey) {
          return {
            ...user,
            e_mail: [...user.e_mail, email]
          };
        }
        return user;
      });
      dispatch({ type: ADD_EMAIL, payload: { newCurrentUser, newUsers } });
    },
    [state.users, state.currentUser]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loadUser,
        addEmail,
        deleteEmail,
        setCurrentUser,
        logOut,
        sendPhone,
        login,
        getPin,
        getContragentSettings,
        checkPin,
        refreshToken,
        setAuthError,
        setIsPasswordReset,
        setIsUserRegister
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AUthState;
