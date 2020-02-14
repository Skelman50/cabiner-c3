import React from "react";
import { Card } from "semantic-ui-react";

const PaymentCardDescription = ({ currentContract }) => {
  if (!currentContract) return null;
  if (currentContract.summa === "Відсутня") {
    return (
      <Card.Description style={{ color: "green" }} className="center-text">
        Заборгованість <strong>відсутня.</strong>
      </Card.Description>
    );
  }
  if (currentContract.summa.includes("-")) {
    return (
      <Card.Description style={{ color: "green" }} className="center-text">
        Переплата <strong>{currentContract.summa.replace("-", "")} грн.</strong>
      </Card.Description>
    );
  } else {
    return (
      <Card.Description style={{ color: "red" }} className="center-text">
        Заборгованість <strong>{currentContract.summa} грн.</strong>
      </Card.Description>
    );
  }
};

export default PaymentCardDescription;
