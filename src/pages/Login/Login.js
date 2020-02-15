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
import InfoMessage from "../../components/shared/InfoMessage/InfoMessage";
import { Redirect } from "react-router-dom";
import { pinMessage } from "../../utils/pin-messages";
import ReactInputMask from "react-input-mask";
import { filterPhone } from "../../utils/filter-phone";

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

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loadingUser}
      style={{ maxWidth: "500px", margin: "2em auto" }}
    >
      {!dbUser && !isPassword && (
        <InfoMessage text={"Введіть свій верифікований номер телефону!"} />
      )}
      {dbUser === "yes" &&
        !isPassword &&
        !isForgotPassword &&
        !isSendPinForForgot && <InfoMessage text={"Введіть свій пароль!"} />}
      {dbUser === "no" &&
        !isPassword &&
        !pinStatus &&
        !isForgotPassword &&
        !isSendPinForForgot && (
          <InfoMessage
            text={
              "Це ваш перший вхід в систему. Придумайте пароль та підтвердіть його."
            }
          />
        )}
      {dbUser === "yes" &&
        !isPassword &&
        isForgotPassword &&
        !isSendPinForForgot && (
          <InfoMessage text={"Введіть новий пароль та підтвердіть його!"} />
        )}
      {(isPassword || isSendPinForForgot || (dbUser === "no" && pinStatus)) && (
        <InfoMessage text={pinMessage({ pinStatus, pinType, timer })} />
      )}

      <Segment>
        {!dbUser && (
          <ReactInputMask
            mask="+380 (99) 9999999"
            value={phonenumber}
            onChange={handleChangePhoneInput}
          >
            {inputProps => (
              <Form.Input
                error={error}
                placeholder="Телефон"
                fluid
                icon="phone"
                autoFocus
                name="phone"
                type="tel"
                label="Телефон"
                iconPosition="left"
                {...inputProps}
              />
            )}
          </ReactInputMask>
        )}

        {dbUser && !isPassword && !isSendPinForForgot && !pinStatus && (
          <Fragment>
            <Form.Input
              fluid
              error={error}
              type="password"
              autoFocus
              placeholder="Пароль"
              value={password}
              label="Пароль"
              iconPosition="left"
              icon="lock"
              onChange={e => setPassword(e.target.value)}
            />
            {!isForgotPassword && dbUser !== "no" && (
              <div
                className="login-helper-text"
                onClick={() => {
                  setAuthError(null);
                  setIsForgotPassword(true);
                }}
              >
                Забули пароль?
              </div>
            )}
            {isForgotPassword && dbUser !== "no" && (
              <div
                className="login-helper-text"
                onClick={() => setIsForgotPassword(false)}
              >
                Згадали пароль?
              </div>
            )}
          </Fragment>
        )}
        {dbUser === "yes" &&
          !isPassword &&
          isForgotPassword &&
          !pinStatus &&
          !isSendPinForForgot && (
            <Form.Input
              fluid
              error={error}
              type="password"
              placeholder="Підтвердіть пароль"
              value={confirmPassword}
              label="Підтвердження пароля"
              iconPosition="left"
              icon="lock"
              onChange={e => setConfirmPassword(e.target.value)}
            />
          )}
        {dbUser === "no" &&
          !isPassword &&
          !isSendPinForForgot &&
          !pinStatus && (
            <Form.Input
              fluid
              error={error}
              type="password"
              placeholder="Підтвердіть пароль"
              value={confirmPassword}
              label="Підтвердження пароля"
              iconPosition="left"
              icon="lock"
              onChange={e => setConfirmPassword(e.target.value)}
            />
          )}
        {(isPassword ||
          isSendPinForForgot ||
          (dbUser === "no" && pinStatus)) && (
          <Fragment>
            <ReactInputMask
              mask="9999"
              value={pin}
              maskChar="*"
              onChange={e => setPin(e.target.value)}
            >
              {inputProps => (
                <Form.Input
                  fluid
                  {...inputProps}
                  error={error}
                  autoFocus
                  placeholder="PIN"
                  label="PIN"
                  iconPosition="left"
                  icon="certificate"
                />
              )}
            </ReactInputMask>
            <div
              className="login-helper-text"
              onClick={() => {
                const filteredPhone = filterPhone(phonenumber);
                getPin({ phoneToPin: filteredPhone.replace("+", "") });
              }}
            >
              Отримати знову
            </div>
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
