import React from "react";
import { Message } from "semantic-ui-react";

import "./InfoMessage.css";

const InfoMessage = ({ text }) => {
  return (
    <Message
      attached
      icon="privacy"
      content={text}
      color="blue"
      className="info-message"
    />
  );
};

export default InfoMessage;
