import React from "react";
import { Card } from "semantic-ui-react";

const CardHeader = ({ type, setType, currentContract }) => {
  const setHeaderheader = () => {
    if (!type) {
      return (
        <Card.Header>{`Оплата по угоді ${currentContract.number}`}</Card.Header>
      );
    }
    if (type === "liqpay") {
      return (
        <Card.Header>{`Оплата по угоді ${currentContract.number} через LIQPAY`}</Card.Header>
      );
    }
    if (type === "setliqpay") {
      return (
        <Card.Header style={{ color: "red" }}>Підтвердження опати!</Card.Header>
      );
    } else {
      return (
        <Card.Header>{`Реквізити для оплати по угоді ${currentContract.number} \n ("Приват24", "ПУМБ-online" і т.і.)`}</Card.Header>
      );
    }
  };

  const setMeta = () => {
    if (!type) {
      return "Оберіть тип оплати";
    }
    if (type === "liqpay") {
      return "Введіть суму до сплати";
    } else {
      return null;
    }
  };

  const setContent = () => {
    if (currentContract.summa === "Відсутня") {
      return (
        <Card.Description style={{ color: "green" }}>
          Заборгованість <strong>відсутня</strong>
        </Card.Description>
      );
    }
    if (currentContract.summa.includes("-")) {
      return (
        <Card.Description style={{ color: "green" }}>
          Переплата{" "}
          <strong>{currentContract.summa.replace("-", "")} грн</strong>
        </Card.Description>
      );
    } else {
      return (
        <Card.Description style={{ color: "red" }}>
          Заборгованість <strong>{currentContract.summa} грн</strong>
        </Card.Description>
      );
    }
  };

  return (
    <Card.Content>
      {setHeaderheader()}
      {type === "setliqpay" && <div>Угода{currentContract.number}</div>}
      {setContent()}
      <Card.Meta>{setMeta()}</Card.Meta>
    </Card.Content>
  );
};

export default CardHeader;
