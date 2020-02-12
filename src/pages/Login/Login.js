import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  Fragment
} from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import { AuthContext } from "../../context/auth/auth-context";
import useMediaQuery from "react-use-media-query-hook";

import "./Login.css";
import ErrorMessage from "../../components/shared/ErrorMessage/ErrorMessage";
import InfoMessage from "../../components/shared/InfoMessage/InfoMessage";
import { Redirect } from "react-router-dom";
import { pinMessage } from "../../utils/pin-messages";

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
    checkPin
  } = useContext(AuthContext);
  const [phonenumber, setPhonenumber] = useState("+380");
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
    getPin({ phoneToPin: phonenumber.replace("+", "") });
  }, [isPassword, phonenumber, getPin]);

  useEffect(() => {
    if (!isSendPinForForgot) return;
    getPin({ phoneToPin: phonenumber.replace("+", "") });
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
    if (
      isNaN(+e.target.value) ||
      e.target.value.length > 13 ||
      e.target.value.length < 4
    )
      return;
    setPhonenumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!dbUser) {
      sendPhone({ phonenumber });
    } else if (!isPassword && !isForgotPassword) {
      login({
        phoneNumber: phonenumber,
        password
      });
    } else if (isForgotPassword && !isPassword) {
      setIsSendPinForForgot(true);
      getPin({ phoneToPin: phonenumber.replace("+", "") });
    } else {
      checkPin({
        phonenumber: phonenumber.replace("+", ""),
        pin,
        isLogIn: true
      });
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loadingUser}
      style={{ maxWidth: "700px", margin: "2em auto" }}
    >
      {error && <ErrorMessage error={error} />}

      {!error && !dbUser && !isPassword && !error && (
        <InfoMessage text={"Введіть свій верифікований номер телефону!"} />
      )}
      {!error && dbUser && !isPassword && !isForgotPassword && !error && (
        <InfoMessage text={"Введіть свій пароль!"} />
      )}
      {!error && dbUser && !isPassword && isForgotPassword && !error && (
        <InfoMessage text={"Введіть новий пароль та підтвердіть його!"} />
      )}
      {!error &&
        (isPassword || isSendPinForForgot) &&
        timer !== 0 &&
        !error && (
          <InfoMessage text={pinMessage({ pinStatus, pinType, timer })} />
        )}
      {!error && pinStatus === "No Send" && error && timer !== 0 && (
        <InfoMessage text={pinMessage({ pinStatus, pinType, timer })} />
      )}

      <Segment>
        {!dbUser && (
          <Form.Input
            placeholder="Телефон"
            fluid
            icon="phone"
            name="phone"
            label="Телефон"
            iconPosition="left"
            value={phonenumber}
            onChange={handleChangePhoneInput}
          />
        )}
        {dbUser && !isPassword && (
          <Fragment>
            <Form.Input
              fluid
              type="password"
              placeholder="Пароль"
              value={password}
              label="Пароль"
              iconPosition="left"
              icon="lock"
              onChange={e => setPassword(e.target.value)}
            />
            {!isForgotPassword && (
              <div
                className="login-helper-text"
                onClick={() => setIsForgotPassword(true)}
              >
                Забули пароль?
              </div>
            )}
            {isForgotPassword && (
              <div
                className="login-helper-text"
                onClick={() => setIsForgotPassword(false)}
              >
                Згадали пароль?
              </div>
            )}
          </Fragment>
        )}
        {dbUser && !isPassword && isForgotPassword && (
          <Form.Input
            fluid
            type="password"
            placeholder="Підтвердіть пароль"
            value={confirmPassword}
            label="Підтвердження пароля"
            iconPosition="left"
            icon="lock"
            onChange={e => setConfirmPassword(e.target.value)}
          />
        )}
        {(isPassword || isSendPinForForgot) && (
          <Fragment>
            <Form.Input
              fluid
              type="number"
              placeholder="PIN"
              value={pin}
              label="PIN"
              iconPosition="left"
              icon="certificate"
              onChange={e => setPin(e.target.value)}
            />
            {timer === 0 && (
              <div
                className="login-helper-text"
                onClick={() =>
                  getPin({ phoneToPin: phonenumber.replace("+", "") })
                }
              >
                Отримати знову
              </div>
            )}
          </Fragment>
        )}
        <Button
          type="submit"
          primary
          icon="send"
          disabled={
            loadingUser || phonenumber.length < 13
            // password.length < 6 ||
            // password !== confirmPassword ||
            // pin.length < 4
          }
          content="Відправити"
        />
      </Segment>
    </Form>
  );
};

export default Login;
