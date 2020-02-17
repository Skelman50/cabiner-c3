import React, { useContext } from "react";
import useMediaQuery from "react-use-media-query-hook";
import { Card, Button, Icon, Segment } from "semantic-ui-react";
import useRedirect from "../../hooks/useRedirect";
import { Redirect } from "react-router-dom";
import { ContractsContext } from "../../context/contracts/contracts-context";
import PaymentCardDescription from "../../components/shared/PaymentCardDescription/PaymentCardDescription";
import BackIcon from "../../components/shared/BackIcon/BackIcon";

const Payments = props => {
  const redirect = useRedirect();
  const { currentContract } = useContext(ContractsContext);
  const isMobile = useMediaQuery("(max-width: 550px)");
  if (redirect || !currentContract) {
    return <Redirect to="/" />;
  }

  const redirectTo = () => {
    props.history.push("/");
  };

  return (
    <Card fluid>
      <Card.Content>
        <BackIcon redirectTo={redirectTo} />
        <Card.Header>{`Угода ${currentContract.number}`}</Card.Header>
        <PaymentCardDescription currentContract={currentContract} />
        <Card.Meta style={{ color: "black", marginTop: "0.2em" }}>
          Оберіть тип оплати
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        {!isMobile && (
          <Segment className="segment-no-border no-padding" floated="right">
            <Button
              className="button"
              color="green"
              style={{ width: "15rem" }}
              onClick={() => props.history.push("/payments/liqpay")}
            >
              LIQPAY
              <Icon name="angle double right" />
            </Button>
            <Button
              className="button"
              primary
              style={{ width: "15rem" }}
              content="Інші способи"
              icon="list ol"
              onClick={() => props.history.push("/payments/privat")}
            />
          </Segment>
        )}
        {isMobile && (
          <div className="ui two buttons" floated="right">
            <Button
              className="button"
              basic
              color="green"
              onClick={() => props.history.push("/payments/liqpay")}
            >
              LIQPAY
              <Icon name="angle double right" />
            </Button>
            <Button
              className="button"
              basic
              primary
              content="Інші способи"
              icon="list ol"
              onClick={() => props.history.push("/payments/privat")}
            />
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default Payments;
