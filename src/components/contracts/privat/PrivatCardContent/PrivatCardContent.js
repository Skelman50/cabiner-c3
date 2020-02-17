import React, { Fragment } from "react";
import { Card } from "semantic-ui-react";
import PaymentCardDescription from "../../../shared/PaymentCardDescription/PaymentCardDescription";
import BackIcon from "../../../shared/BackIcon/BackIcon";

const PrivatCardContent = props => {
  const redirectTo = () => {
    props.history.push("/payments");
  };
  return (
    <Fragment>
      <Card.Content>
        <BackIcon redirectTo={redirectTo} />
        <Card.Header className="center-text privat-payment-header">{`Реквізити для оплати по угоді ${props.currentContract.number}`}</Card.Header>
        <Card.Header
          className="center-text privat-payment-header"
          style={{ marginTop: "0.25em" }}
        >
          ("Приват24", "ПУМБ-online" і т.і.)
        </Card.Header>
        <PaymentCardDescription
          currentContract={props.currentContract}
          isCenter
        />
      </Card.Content>
    </Fragment>
  );
};

export default PrivatCardContent;
