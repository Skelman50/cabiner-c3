import React, { useContext } from "react";

import { Card, Button, Icon } from "semantic-ui-react";
import useRedirect from "../../hooks/useRedirect";
import { Redirect } from "react-router-dom";
import { ContractsContext } from "../../context/contracts/contracts-context";
import PaymentCardDescription from "../../components/shared/PaymentCardDescription/PaymentCardDescription";

const Payments = props => {
  const redirect = useRedirect();
  const { currentContract } = useContext(ContractsContext);
  if (redirect || !currentContract) {
    return <Redirect to="/" />;
  }
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{`Оплата по угоді ${currentContract.number}`}</Card.Header>
        <PaymentCardDescription currentContract={currentContract} />
        <Card.Meta>Оберіть тип оплати</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            onClick={() => props.history.push("/payments/liqpay")}
          >
            LIQPAY
            <Icon name="angle double right" />
          </Button>
          <Button
            basic
            color="blue"
            content="Інші способи"
            icon="list ol"
            onClick={() => props.history.push("/payments/privat")}
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default Payments;
