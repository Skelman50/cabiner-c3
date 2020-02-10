import React, { useContext, useRef, useEffect } from "react";
import { Card, Form, Icon, Button } from "semantic-ui-react";
import useRedirect from "../../hooks/useRedirect";
import { ContractsContext } from "../../context/contracts/contracts-context";
import { Redirect } from "react-router-dom";
import PaymentCardDescription from "../../components/shared/PaymentCardDescription/PaymentCardDescription";
import { AuthContext } from "../../context/auth/auth-context";

const Liqpay = props => {
  const redirect = useRedirect();
  const { payAmount, setPayAmount, currentContract } = useContext(
    ContractsContext
  );
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef || !inputRef.current) return;
    inputRef.current.focus();
  }, []);
  if (redirect || !currentContract) {
    return <Redirect to="/" />;
  }

  const setCheckout = async () => {};

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{`Оплата по угоді ${currentContract.number}`}</Card.Header>
        <PaymentCardDescription currentContract={currentContract} />
        <Card.Meta>Оберіть тип оплати</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Form onSubmit={() => props.history.push("/payments/liqpay/checkout")}>
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
          <div className="ui two buttons">
            <Button
              as="div"
              basic
              color="red"
              content="Назад"
              icon="arrow alternate circle left"
              onClick={() => props.history.push("/payments")}
            />
            <Button type="submit" basic color="green">
              Сплатити
              <Icon name="arrow alternate circle right" />
            </Button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default Liqpay;
