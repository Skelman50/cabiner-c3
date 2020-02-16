import React from "react";
import { Card, Button } from "semantic-ui-react";

const CardAction = ({ setType, type }) => {
  const handleClick = () => {
    if (!type) {
      setType("confirm");
      return;
    }
    setType(null);
  };
  return (
    <Card.Content>
      <Button
        floated="right"
        primary
        content={!type ? "Змінити" : "Змінити ще раз"}
        icon="edit"
        onClick={handleClick}
      />
    </Card.Content>
  );
};

export default CardAction;
