import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Segment, Message } from "semantic-ui-react";

import "./PageWrapper.css";
import { AuthContext } from "../../context/auth/auth-context";

const PageWrapper = props => {
  const location = useLocation();
  const {
    isPasswordReset,
    setIsPasswordReset,
    isUserRegister,
    setIsUserRegister
  } = useContext(AuthContext);
  return (
    <Segment
      className={`segment-no-border max-width no-padding page-wrapper${
        location.pathname === "/login" ? " login" : ""
      }`}
    >
      {isPasswordReset && (
        <Message info onDismiss={() => setIsPasswordReset(false)}>
          <Message.Header>Пароль успішно змінено!</Message.Header>
        </Message>
      )}
      {isUserRegister && (
        <Message info onDismiss={() => setIsUserRegister(false)}>
          <Message.Header>Ви успішно зареєстровані!</Message.Header>
        </Message>
      )}
      {props.children}
    </Segment>
  );
};

export default PageWrapper;
