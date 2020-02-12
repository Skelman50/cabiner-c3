import React from "react";
import { Message } from "semantic-ui-react";

const InfoMessage = ({ text }) => {
  return <Message attached icon="privacy" content={text} color="blue" />;
};

export default InfoMessage;
