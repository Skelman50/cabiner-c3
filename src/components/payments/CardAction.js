import React from "react";
import { Card, Button, Icon, Form } from "semantic-ui-react";

const CardAction = ({ type, setType }) => {
  const setContent = () => {
    if (!type) {
      return (
        <div className="ui two buttons">
          <Button basic color="green" onClick={() => setType("liqpay")}>
            LIQPAY
            <Icon name="angle double right" />
          </Button>
          <Button
            basic
            color="blue"
            content="Інші способи"
            icon="list ol"
            onClick={() => setType("privat")}
          />
        </div>
      );
    }
    if (type === "liqpay") {
      return (
        <Form onSubmit={() => setType("setliqpay")}>
          <Form.Field>
            <label>Введіть суму</label>
            <input placeholder="Введіть суму" />
          </Form.Field>
          <div className="ui two buttons">
            <Button
              as="div"
              basic
              color="red"
              content="Назад"
              icon="arrow alternate circle left"
              onClick={() => setType(null)}
            />
            <Button type="submit" basic color="green">
              Сплатити
              <Icon name="arrow alternate circle right" />
            </Button>
          </div>
        </Form>
      );
    }
  };
  return <Card.Content extra>{setContent()}</Card.Content>;
};

export default CardAction;
