import React from "react";
import { Dropdown, Segment } from "semantic-ui-react";

const ContractDropDown = () => {
  return (
    <Segment as="div" floated="right" className="segment-no-border no-padding">
      <Dropdown text="Опції">
        <Dropdown.Menu style={{ left: "-115px" }}>
          <Dropdown.Item text="Налаштування" icon="setting" />
          <Dropdown.Item text="Переглянуты об'єкти" icon="building" />
          <Dropdown.Item text="Угоди" icon="file pdf" />
          <Dropdown.Item text="Акти" icon="file pdf" />
        </Dropdown.Menu>
      </Dropdown>
    </Segment>
  );
};

export default ContractDropDown;
