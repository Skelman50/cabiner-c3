import React from "react";
import { Card, Button } from "semantic-ui-react";

const ContractCardAction = () => {
  return (
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="green">
          Сплатити{" "}
        </Button>
      </div>
    </Card.Content>
  );
};

export default ContractCardAction;
