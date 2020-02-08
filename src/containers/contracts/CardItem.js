import React from "react";
import { Card } from "semantic-ui-react";
import ContractsCardContent from "../../components/contracts/CardContent";
import ContractDropDown from "../../components/contracts/DropDown";
import ContractCardAction from "../../components/contracts/CardAction";

const CardItem = ({ contract }) => {
  return (
    <Card fluid>
      <ContractsCardContent contract={contract}>
        <ContractDropDown />
      </ContractsCardContent>
      <ContractCardAction />
    </Card>
  );
};

export default CardItem;
