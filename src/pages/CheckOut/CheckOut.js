import React, { useContext, useEffect, useState } from "react";
import useRedirect from "../../hooks/useRedirect";
import { ContractsContext } from "../../context/contracts/contracts-context";
import { Redirect } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";
import PaymentCardDescription from "../../components/shared/PaymentCardDescription/PaymentCardDescription";

const CheckOut = () => {
  const redirect = useRedirect();
  const {
    currentContract,
    createSignature,
    checkoutData,
    payAmount
  } = useContext(ContractsContext);

  const [goToPayments, setGoToPayments] = useState(false);

  useEffect(() => {
    return () => {
      createSignature(null);
    };
  }, [createSignature]);

  if (redirect || !currentContract || !checkoutData) {
    return <Redirect to="/" />;
  }
  if (goToPayments) {
    return <Redirect to="/payments" />;
  }
  const amount = +payAmount;
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header style={{ color: "red" }}>
          Підтвердження оплати!
        </Card.Header>
        <Card.Header
          style={{ margin: "0.2em 0" }}
        >{`Угода ${currentContract.number}.`}</Card.Header>
        <PaymentCardDescription currentContract={currentContract} />
        <Card.Meta
          style={{ color: "black", fontWeight: "bold", marginTop: "0.2em" }}
        >{`Сума до сплати ${amount.toFixed(2)} грн.`}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <form
          method="POST"
          action="https://www.liqpay.ua/api/3/checkout"
          acceptCharset="utf-8"
          className="liqpay-submit"
        >
          <input type="hidden" name="data" value={checkoutData.data} />
          <input
            type="hidden"
            name="signature"
            value={checkoutData.signature}
          />
          <div className="ui two buttons">
            <Button basic color="green" icon="check" content="Підтвердити" />

            <Button
              basic
              color="red"
              content="Відміна"
              icon="cancel"
              as="div"
              onClick={() => setGoToPayments(true)}
            />
          </div>
        </form>
        {/* <div className="ui two buttons">
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
    </div> */}
      </Card.Content>
    </Card>
  );
};

export default CheckOut;
