import React, { useContext, useEffect, useState } from "react";
import { Card, Form, Button, Segment, Icon, Popup } from "semantic-ui-react";
// import useMediaQuery from "react-use-media-query-hook";
import useRedirect from "../../hooks/useRedirect";
import { ContractsContext } from "../../context/contracts/contracts-context";
import { Redirect } from "react-router-dom";
import PaymentCardDescription from "../../components/shared/PaymentCardDescription/PaymentCardDescription";
import ErrorMessage from "../../components/shared/ErrorMessage/ErrorMessage";

import "./Liqpay.css";

const Liqpay = props => {
  const redirect = useRedirect();
  const {
    payAmount,
    setPayAmount,
    currentContract,
    createCheckOut,
    checkoutData,
    loadingContracts,
    error,
    setError
  } = useContext(ContractsContext);

  // const isMobile = useMediaQuery("(max-width: 550px)");

  const [isCheckOut, setIsCheckOut] = useState(false);

  useEffect(() => {
    setError(null);
  }, [setError]);

  useEffect(() => {
    if (checkoutData) {
      setIsCheckOut(true);
    }
  }, [checkoutData, props.history]);

  useEffect(() => {
    setPayAmount("");
  }, [setPayAmount]);

  if (redirect || !currentContract) {
    return <Redirect to="/" />;
  }

  if (isCheckOut) {
    return <Redirect to="/payments/liqpay/checkout" />;
  }

  return (
    <Card fluid>
      {error && <ErrorMessage error={error} />}
      <Card.Content>
        <Popup
          content="Повернутися до вибору способи оплати"
          trigger={
            <Icon
              className="icon-back"
              name="reply"
              onClick={() => props.history.push("/payments")}
            />
          }
        />
        <Card.Header className="center-text">{`Оплата по угоді ${currentContract.number}`}</Card.Header>
        <PaymentCardDescription currentContract={currentContract} />
      </Card.Content>
      <Card.Content extra>
        <Form onSubmit={createCheckOut}>
          <Form.Field>
            <Form.Input
              icon="credit card"
              iconPosition="left"
              label="Введіть суму в грн"
              placeholder="Введіть суму в грн"
              autoFocus
              type="number"
              value={payAmount}
              onChange={e => setPayAmount(e.target.value)}
            />
          </Form.Field>
          <Segment
            className="segment-no-border no-padding"
            disabled={loadingContracts}
            loading={loadingContracts}
          >
            <Button
              type="submit"
              primary
              content="Сплатити"
              floated="right"
              icon="check"
              disabled={!payAmount || payAmount <= 0}
            />
          </Segment>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default Liqpay;
