import React from "react";
import { Card, Button, Dropdown, Segment } from "semantic-ui-react";

const Contracts = () => {
  return (
    <Card fluid>
      <Card.Content>
        <Segment
          as="div"
          floated="right"
          style={{ padding: "0", border: "0", boxShadow: "none" }}
        >
          <Dropdown text="Опції">
            <Dropdown.Menu style={{ left: "-115px" }}>
              <Dropdown.Item text="Налаштування" icon="setting" />
              <Dropdown.Item text="Переглянуты об'єкти" icon="building" />
              <Dropdown.Item text="Угоди" icon="file pdf" />
              <Dropdown.Item text="Акти" icon="file pdf" />
            </Dropdown.Menu>
          </Dropdown>
        </Segment>
        <Card.Header>Steve Sanders</Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
        <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Сплатити{" "}
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default Contracts;
