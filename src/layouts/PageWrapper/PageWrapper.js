import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Segment, Message } from "semantic-ui-react";
import classNames from "classnames";

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

  const className = classNames({
    "segment-no-border": true,
    "max-width": true,
    "no-padding": true,
    "page-wrapper": true,
    login: location.pathname === "/login",
    "wrap-with-bottom-nav":
      location.pathname.includes("archives") ||
      location.pathname.includes("settings")
  });
  return (
    <Segment className={className}>
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
