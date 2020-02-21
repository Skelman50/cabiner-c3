import React, { Fragment } from "react";
import { Icon, Message } from "semantic-ui-react";

const MessageContent = ({ type }) => {
  return (
    <Message info className="settings-password-message">
      {!type && (
        <Fragment>
          <Icon name="question circle" />
          <span>Бажаєте змінити пароль?</span>
        </Fragment>
      )}
      {type === "confirm" && (
        <Fragment>
          <Icon name="exclamation circle" />
          <span>Введіть свій пароль!</span>
        </Fragment>
      )}
      {type === "edit" && (
        <Fragment>
          <Icon name="exclamation circle" />
          <span>
            Введіть новий пароль (не менше 6 символів) та підтвердіть його!
          </span>
        </Fragment>
      )}
      {type === "success" && (
        <Fragment>
          <Icon name="check" />
          <span>Пароль успішно змінено!</span>
        </Fragment>
      )}
    </Message>
  );
};

export default MessageContent;
