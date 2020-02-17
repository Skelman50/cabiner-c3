import React from "react";
import { Card } from "semantic-ui-react";
import classNames from "classnames";

const PaymentCardDescription = ({ currentContract, isCenter = false }) => {
  const className = classNames({
    "center-text": isCenter
  });
  if (!currentContract) return null;
  if (currentContract.summa === "Відсутня") {
    return (
      <Card.Description style={{ color: "green" }} className={className}>
        Заборгованість <strong>відсутня.</strong>
      </Card.Description>
    );
  }
  if (currentContract.summa.includes("-")) {
    return (
      <Card.Description style={{ color: "green" }} className={className}>
        Переплата <strong>{currentContract.summa.replace("-", "")} грн.</strong>
      </Card.Description>
    );
  } else {
    return (
      <Card.Description style={{ color: "red" }} className={className}>
        Заборгованість <strong>{currentContract.summa} грн.</strong>
      </Card.Description>
    );
  }
};

export default PaymentCardDescription;
