import React, { useState, useContext, useEffect, useRef } from "react";
import { Form, Button, Card } from "semantic-ui-react";
import { AuthContext } from "../../context/auth/auth-context";
import useMediaQuery from "react-use-media-query-hook";

import "./Login.css";
import ErrorMessage from "../../components/shared/ErrorMessage/ErrorMessage";
import InfoMessage from "../../components/shared/InfoMessage/InfoMessage";
import InputField from "../../components/auth/InputField/InputField";
import { Redirect } from "react-router-dom";

const Login = () => {
  const isMobile = useMediaQuery("(max-width: 550px)");
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
    checkPin
  } = useContext(AuthContext);
  const [phonenumber, setPhonenumber] = useState("+380");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [timer, setTimer] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const timerRef = useRef();

  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const pinInputRef = useRef(null);

  useEffect(() => {
    if (phonenumber.length === 4 && !isPassword) {
      phoneInputRef.current.focus();
    }
    if (!isPassword) return;
    pinInputRef.current.focus();
    getPin({ phoneToPin: phonenumber.replace("+", "") });
  }, [isPassword, phonenumber, getPin]);

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

  useEffect(() => {
    if (!dbUser) return;
    passwordInputRef.current.focus();
  }, [dbUser]);

  const handleChangePhoneInput = e => {
    if (
      isNaN(+e.target.value) ||
      e.target.value.length > 13 ||
      e.target.value.length < 4
    )
      return;
    setPhonenumber(e.target.value);
  };

  const handleChangePin = e => {
    setPin(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!dbUser) {
      sendPhone({ phonenumber });
    } else if (!isPassword) {
      login({
        phoneNumber: phonenumber,
        password
      });
    } else {
      checkPin({
        phonenumber: phonenumber.replace("+", ""),
        pin,
        isLogIn: true
      });
    }
  };

  const pinMessage = () => {
    if (pinStatus === "No Send") {
      return `PIN уже відправлено! Наступний можно отримати через ${timer} секунд.`;
    }
    if (pinType === "telegram" && pinStatus === "Send") {
      return `Щойно на Ваш акаунт у Telegram було відправлене повідомлення з PIN-кодом. Будь-ласка, введіть отриманий код та натисніть кнопку "Надіслати"!`;
    }
    if (pinType !== "telegram" && pinStatus === "Send") {
      return `Щойно на Ваш мобільний телефон було відправлене повідомлення з PIN-кодом. Будь-ласка, введіть отриманий код та натисніть кнопку "Надіслати"!`;
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Card className="login-card">
      <Form
        onSubmit={handleSubmit}
        loading={loadingUser}
        className="login-form"
      >
        <Form.Field>
          {error && <ErrorMessage error={error} />}
          {dbUser && !isPassword && !error && (
            <InfoMessage text={"Введіть свій пароль!"} />
          )}
          {isPassword && timer !== 0 && !error && (
            <InfoMessage text={pinMessage()} />
          )}
          {pinStatus === "No Send" && error && timer !== 0 && (
            <InfoMessage text={pinMessage()} />
          )}
          {!dbUser && (
            <InputField
              isPhone
              value={phonenumber}
              inputRef={phoneInputRef}
              handleChange={handleChangePhoneInput}
            />
          )}
          {dbUser && !isPassword && (
            <InputField
              isPassword
              inputRef={passwordInputRef}
              value={password}
              handleChange={handleChangePassword}
            />
          )}
          {isPassword && (
            <InputField
              isPin
              value={pin}
              timer={timer}
              inputRef={pinInputRef}
              handleChange={handleChangePin}
              onClick={() =>
                getPin({ phoneToPin: phonenumber.replace("+", "") })
              }
            />
          )}
        </Form.Field>

        {!isMobile && (
          <Button
            type="submit"
            primary
            icon="send"
            disabled={loadingUser || phonenumber.length < 9}
            content="Відіслати"
          />
        )}

        {isMobile && (
          <div className="login-mobile-button__content">
            <Button
              className="login-mobile-button"
              type="submit"
              basic
              color="blue"
              icon="send"
              disabled={loadingUser || phonenumber.length < 9}
              content="Відіслати"
            />
          </div>
        )}
      </Form>
    </Card>
  );
};

export default Login;
