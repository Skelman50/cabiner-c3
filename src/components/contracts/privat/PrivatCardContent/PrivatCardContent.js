import React, { Fragment } from "react";
import { Card, Popup, Icon } from "semantic-ui-react";
import PaymentCardDescription from "../../../shared/PaymentCardDescription/PaymentCardDescription";

const PrivatCardContent = props => {
  return (
    <Fragment>
      <Card.Content>
        <Popup
          content="Повернутися до вибору типів оплати"
          trigger={
            <Icon
              className="icon-back"
              name="reply"
              onClick={() => props.history.push("/payments")}
            />
          }
        />
        <Card.Header className="center-text privat-payment-header">{`Реквізити для оплати по угоді ${props.currentContract.number}`}</Card.Header>
        <Card.Header
          className="center-text privat-payment-header"
          style={{ marginTop: "0.25em" }}
        >
          ("Приват24", "ПУМБ-online" і т.і.)
        </Card.Header>
        <PaymentCardDescription currentContract={props.currentContract} />
      </Card.Content>
    </Fragment>
  );
};

export default PrivatCardContent;
