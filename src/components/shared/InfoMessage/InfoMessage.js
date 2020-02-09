import React from "react";
import { Message } from "semantic-ui-react";

const InfoMessage = ({ text }) => {
  return (
    <Message info>
      <Message.Header>{text}</Message.Header>
    </Message>
  );
};

export default InfoMessage;
