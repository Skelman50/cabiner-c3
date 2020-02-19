import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

const ConfirmDeleteEmail = ({ open, closeConfirm, handleDelete }) => {
  return (
    <Modal
      open={open}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      onClose={() => console.log("asd")}
    >
      <Modal.Header>
        <Icon name="warning circle" /> Видалення електронної пошти
      </Modal.Header>
      <Modal.Content>
        <p>
          Ви дійсно бажаєте видалити свою електронну пошту зі списку контактів?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closeConfirm} negative>
          Ні
        </Button>
        <Button
          onClick={handleDelete}
          positive
          labelPosition="right"
          icon="checkmark"
          content="Так"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmDeleteEmail;
