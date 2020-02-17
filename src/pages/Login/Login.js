import React, { useState, useContext, useEffect, useRef } from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import { AuthContext } from "../../context/auth/auth-context";
import useMediaQuery from "react-use-media-query-hook";
import "./Login.css";
import { Redirect } from "react-router-dom";

import { filterPhone } from "../../utils/filter-phone";
import LoginMessage from "../../components/login/LoginMessage/LoginMessage";
import LoginContent from "../../components/login/LoginContent/LoginContent";

const Login = () => {
  const {
    dbUser,
    error,
    loadingUser,
    sendPhone,
    login,
    isPassword,
    isLoggedIn,
    pinStatus,
    pinType,
    pinTimeout,
    getPin,
    setAuthError,
    checkPin
  } = useContext(AuthContext);
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [timer, setTimer] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSendPinForForgot, setIsSendPinForForgot] = useState(false);
  const isScroll = useMediaQuery("(max-height: 450px)");

  const timerRef = useRef();

  useEffect(() => {
    if (isScroll) {
      window.scrollTo(0, window.outerHeight);
    }
  }, [isScroll]);

  useEffect(() => {
    if (!isPassword) return;
    const filteredPhone = filterPhone(phonenumber);
    getPin({ phoneToPin: filteredPhone.replace("+", "") });
  }, [isPassword, phonenumber, getPin]);

  useEffect(() => {
    if (!isSendPinForForgot) return;
    const filteredPhone = filterPhone(phonenumber);
    getPin({ phoneToPin: filteredPhone.replace("+", "") });
  }, [isSendPinForForgot, phonenumber, getPin]);

  useEffect(() => {
    if (!isLoggedIn) return;
    setRedirect(true);
  }, [isLoggedIn, setRedirect]);

  useEffect(() => {
    if (!pinTimeout) return;
    setTimer(pinTimeout);
    timerRef.current = setInterval(() => {
      setTimer(prevstate => prevstate - 1);
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [pinTimeout]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerRef.current);
    }
  }, [timer]);

  const handleChangePhoneInput = e => {
    setPhonenumber(e.target.value);
  };

  const handleSubmit = e => {
    const filteredPhone = filterPhone(phonenumber);
    e.preventDefault();
    if (!dbUser) {
      sendPhone({ phonenumber: filteredPhone });
    } else if (
      dbUser === "yes" &&
      !isPassword &&
      !isForgotPassword &&
      !isSendPinForForgot
    ) {
      login({
        phoneNumber: filteredPhone,
        password
      });
    } else if (dbUser === "no" && !pinStatus) {
      getPin({ phoneToPin: filteredPhone.replace("+", "") });
    } else if (isForgotPassword && !isPassword) {
      setIsSendPinForForgot(true);
      setIsForgotPassword(false);
    } else {
      checkPin(
        {
          phonenumber: filteredPhone.replace("+", ""),
          pin,
          isLogIn: true
        },
        {
          isForgotPassword: isSendPinForForgot,
          isRegister: dbUser === "no",
          password
        }
      );
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  const disabled = () => {
    if (!dbUser && !isPassword && filterPhone(phonenumber).includes("_")) {
      return true;
    }
    if (
      dbUser === "yes" &&
      !isPassword &&
      !isForgotPassword &&
      !isSendPinForForgot &&
      password.length < 6
    ) {
      return true;
    }
    if (
      dbUser === "yes" &&
      !isPassword &&
      isForgotPassword &&
      !isSendPinForForgot &&
      (password.length < 6 || password !== confirmPassword)
    ) {
      return true;
    }
    if (
      dbUser === "no" &&
      !isPassword &&
      !pinStatus &&
      !isForgotPassword &&
      !isSendPinForForgot &&
      (password.length < 6 || password !== confirmPassword)
    ) {
      return true;
    }
    if (
      (isPassword || isSendPinForForgot || (dbUser === "no" && pinStatus)) &&
      pin.includes("*")
    ) {
      return true;
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loadingUser}
      style={{ maxWidth: "500px", margin: "2em auto" }}
    >
      <LoginMessage
        dbUser={dbUser}
        isPassword={isPassword}
        isForgotPassword={isForgotPassword}
        isSendPinForForgot={isSendPinForForgot}
        pinStatus={pinStatus}
        pinType={pinType}
        timer={timer}
      />
      <Segment>
        <LoginContent
          error={error}
          phonenumber={phonenumber}
          handleChangePhoneInput={handleChangePhoneInput}
          dbUser={dbUser}
          isPassword={isPassword}
          pinStatus={pinStatus}
          isSendPinForForgot={isSendPinForForgot}
          password={password}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setPassword={setPassword}
          pin={pin}
          setPin={setPin}
          setIsForgotPassword={setIsForgotPassword}
          setAuthError={setAuthError}
          isForgotPassword={isForgotPassword}
          getPin={getPin}
        />
        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Button
            type="submit"
            primary
            icon="send"
            disabled={disabled()}
            content="Відправити"
          />
        </div>
      </Segment>
    </Form>
  );
};

export default Login;
