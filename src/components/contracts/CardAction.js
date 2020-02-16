import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";

const ContractCardAction = ({ onClick }) => {
  return (
    <Card.Content extra>
      <div className="pay-button-content" onClick={onClick}>
        <Button primary className="pay-button" floated="right">
          Сплатити <Icon name="chevron right" />
        </Button>
      </div>
    </Card.Content>
  );
};

export default ContractCardAction;
