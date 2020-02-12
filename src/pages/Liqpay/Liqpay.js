import React, { useContext, useRef, useEffect, useState } from "react";
import { Card, Form, Button, Segment, Icon } from "semantic-ui-react";
import useMediaQuery from "react-use-media-query-hook";
import useRedirect from "../../hooks/useRedirect";
import { ContractsContext } from "../../context/contracts/contracts-context";
import { Redirect } from "react-router-dom";
import PaymentCardDescription from "../../components/shared/PaymentCardDescription/PaymentCardDescription";
import ErrorMessage from "../../components/shared/ErrorMessage/ErrorMessage";

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

  const isMobile = useMediaQuery("(max-width: 550px)");

  const [isCheckOut, setIsCheckOut] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef || !inputRef.current) return;
    inputRef.current.focus();
  }, []);

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
        {isMobile && (
          <Icon
            name="backward"
            style={{ marginBottom: "1em" }}
            onClick={() => props.history.push("/payments")}
          />
        )}
        <Card.Header>{`Оплата по угоді ${currentContract.number}`}</Card.Header>
        <PaymentCardDescription currentContract={currentContract} />
      </Card.Content>
      <Card.Content extra>
        <Form onSubmit={createCheckOut}>
          <Form.Field>
            <label>Введіть суму</label>
            <input
              placeholder="Введіть суму в грн"
              type="number"
              ref={inputRef}
              value={payAmount}
              onChange={e => setPayAmount(e.target.value)}
            />
          </Form.Field>
          <Segment
            className="segment-no-border no-padding"
            disabled={loadingContracts}
            loading={loadingContracts}
          >
            <div className="ui two buttons">
              <Button
                type="submit"
                basic
                color="green"
                content="Сплатити"
                icon="check"
                disabled={!payAmount || payAmount <= 0}
              />

              {!isMobile && (
                <Button
                  as="div"
                  basic
                  color="red"
                  content="Назад"
                  icon="cancel"
                  onClick={() => props.history.push("/payments")}
                />
              )}
            </div>
          </Segment>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default Liqpay;
