import React from "react";
import { Modal, Header, Checkbox, Button } from "semantic-ui-react";

import "./Settings.css";

const ContractSettings = ({ open, onClose, contract }) => {
  return (
    <Modal open={open} onClose={onClose} closeIcon closeOnDimmerClick={false}>
      <Header
        icon="settings"
        className="modal-header"
        content={`Налаштування по угоді ${contract.number}`}
        style={{ fontSize: "1.5em" }}
      />
      <Modal.Header className="segment-no-border">
        <div className="checkbox-group-name">Отримання рахунків</div>
        <div>
          <Checkbox label="Email" name="email" />
        </div>
        <div>
          <Checkbox label="MEDOK" name="medok" />
        </div>
      </Modal.Header>
      <Modal.Header className="segment-no-border">
        <div className="checkbox-group-name">
          Інформування про заборгованість
        </div>
        <div>
          <Checkbox label="SMS" name="sms" defaultChecked disabled />
        </div>
        <div>
          <Checkbox label="Telegram" name="telegram" />
        </div>
      </Modal.Header>
      <Modal.Actions>
        <Button primary content="Зберегти" />
      </Modal.Actions>
    </Modal>
  );
};

export default ContractSettings;
