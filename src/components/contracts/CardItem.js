import React, { useState } from "react";
import { Card, Message } from "semantic-ui-react";
import ContractDropDown from "./DropDown";
import ContractCardAction from "./CardAction";
import ContractContent from "../shared/ContractContent/ContractContent";

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
      <ContractContent contract={contract}>
        <ContractDropDown contract={contract} setUpdated={setUpdated} />
      </ContractContent>
      {contract.isliqpay && <ContractCardAction onClick={handleClick} />}
    </Card>
  );
};

export default CardItem;
