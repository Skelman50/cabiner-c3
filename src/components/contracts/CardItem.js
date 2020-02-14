import React, { useState } from "react";
import { Card, Message } from "semantic-ui-react";
import ContractsCardContent from "./CardContent";
import ContractDropDown from "./DropDown";
import ContractCardAction from "./CardAction";

const CardItem = ({ contract, handleClickPaymentButton }) => {
  const [updated, setUpdated] = useState(false);
  const handleClick = () => {
    handleClickPaymentButton(contract);
  };

  return (
    <Card fluid>
      {updated && (
        <Card.Header>
          <Message info onDismiss={() => setUpdated(false)}>
            <Message.Content>Дані успішно змінено!</Message.Content>
          </Message>
        </Card.Header>
      )}
      <ContractsCardContent contract={contract}>
        <ContractDropDown contract={contract} setUpdated={setUpdated} />
      </ContractsCardContent>
      {contract.isliqpay && <ContractCardAction onClick={handleClick} />}
    </Card>
  );
};

export default CardItem;
