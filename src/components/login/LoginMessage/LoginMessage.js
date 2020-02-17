import React, { Fragment } from "react";
import InfoMessage from "../../shared/InfoMessage/InfoMessage";
import { pinMessage } from "../../../utils/pin-messages";

const LoginMessage = ({
  dbUser,
  isPassword,
  isForgotPassword,
  isSendPinForForgot,
  pinStatus,
  pinType,
  timer
}) => {
  return (
    <Fragment>
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
              "Це ваш перший вхід в систему. Придумайте пароль (не менше 6 символів) та підтвердіть його."
            }
          />
        )}
      {dbUser === "yes" &&
        !isPassword &&
        isForgotPassword &&
        !isSendPinForForgot && (
          <InfoMessage
            text={
              "Введіть новий пароль (не менше 6 символів) та підтвердіть його!"
            }
          />
        )}
      {(isPassword || isSendPinForForgot || (dbUser === "no" && pinStatus)) && (
        <InfoMessage text={pinMessage({ pinStatus, pinType, timer })} />
      )}
    </Fragment>
  );
};

export default LoginMessage;
