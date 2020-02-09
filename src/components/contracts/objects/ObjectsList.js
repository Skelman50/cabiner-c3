import React, { Fragment } from "react";
import { Modal, Header, List } from "semantic-ui-react";

import "./ObjectsList.css";

const ObjectItem = ({ object }) => {
  console.log(object);
  return (
    <Fragment>
      <List
        className="contragents-list"
        style={{ borderBottom: "1px solid rgba(34,36,38,.15)" }}
      >
        <List.Item>
          <List.Content>
            {" "}
            <strong>Назва: </strong>
            {object.name}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            {" "}
            <strong>Адреса: </strong>
            {object.address}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            {" "}
            <strong>Інспектор: </strong>
            {object.inspectorName}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            {" "}
            <strong>Контактний телефон: </strong>
            {object.inspectorPhones && object.inspectorPhones.length !== 0
              ? object.inspectorPhones[0].Представление
              : "+380970022000"}
          </List.Content>
        </List.Item>
      </List>
    </Fragment>
  );
};

const ObjectsList = ({ open, objects, onClose, contractNumber }) => {
  return (
    <Modal open={open} onClose={onClose} closeIcon>
      <Header
        icon="building"
        content={`Об'єкти по угоді ${contractNumber}:`}
        className="contracts-objects__list-header"
      />
      <Modal.Content>
        {objects.map(object => (
          <Fragment key={object.Ref_Key}>
            <ObjectItem object={object} />
          </Fragment>
        ))}
      </Modal.Content>
    </Modal>
  );
};

export default ObjectsList;
