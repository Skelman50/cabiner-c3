import React from "react";
import { Message, Icon } from "semantic-ui-react";

const PrivatMessage = () => {
  return (
    <Message warning className="privat-helper-text-content">
      <Icon name="warning circle" size="large" />
      <div>
        <div>У призначенні платежу міститься службова інформація.</div>
        <div>
          При внесенні змін, зарахування Вашого платежу може бути затримано на
          невизначений термін!
        </div>
      </div>
    </Message>
  );
};

export default PrivatMessage;
