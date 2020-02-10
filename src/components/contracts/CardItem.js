import React from "react";
import { Card } from "semantic-ui-react";
import ContractsCardContent from "./CardContent";
import ContractDropDown from "./DropDown";
import ContractCardAction from "./CardAction";

const CardItem = ({ contract, handleClickPaymentButton }) => {
  const handleClick = () => {
    handleClickPaymentButton(contract);
  };

  return (
    <Card fluid>
      <ContractsCardContent contract={contract}>
        <ContractDropDown contract={contract} />
      </ContractsCardContent>
      {contract.isliqpay && <ContractCardAction onClick={handleClick} />}
    </Card>
  );
};

export default CardItem;
