import React, { Fragment } from "react";
import ReactInputMask from "react-input-mask";
import { Form } from "semantic-ui-react";
import { filterPhone } from "../../../utils/filter-phone";

const LoginContent = ({
  error,
  phonenumber,
  handleChangePhoneInput,
  dbUser,
  isPassword,
  pinStatus,
  isSendPinForForgot,
  password,
  confirmPassword,
  setConfirmPassword,
  setPassword,
  pin,
  setPin,
  setIsForgotPassword,
  setAuthError,
  isForgotPassword,
  getPin
}) => {
  return (
    <Fragment>
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
      {dbUser === "no" && !isPassword && !isSendPinForForgot && !pinStatus && (
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
      {(isPassword || isSendPinForForgot || (dbUser === "no" && pinStatus)) && (
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
    </Fragment>
  );
};

export default LoginContent;
