import React from "react";
import { Card } from "semantic-ui-react";

const ContractsCardContent = ({ contract, children }) => {
  const text = () => {
    if (contract.summa.includes("-")) {
      return (
        <div style={{ color: "green" }}>
          <span>Переплата по угоді</span>{" "}
          <strong> {contract.summa.replace("-", "")} грн.</strong>
        </div>
      );
    } else {
      if (contract.summa === "Відсутня") {
        return (
          <div style={{ color: "green" }}>
            <span>Заборгованість по угоді</span>{" "}
            <strong> {contract.summa}</strong>
          </div>
        );
      } else {
        return (
          <div style={{ color: "red" }}>
            <span>Заборгованість по угоді</span>{" "}
            <strong> {contract.summa} грн.</strong>
          </div>
        );
      }
    }
  };
  return (
    <Card.Content>
      {children}
      <Card.Header>{contract.number}</Card.Header>
      <Card.Description>{text()}</Card.Description>
      <Card.Meta>
        Сума указана з урахуванням абонплати за поточний місяць
      </Card.Meta>
    </Card.Content>
  );
};

export default ContractsCardContent;
