import React, { useContext, useState } from "react";
import { Modal, Header, Checkbox, Button, Popup } from "semantic-ui-react";

import "./Settings.css";
import { AuthContext } from "../../../context/auth/auth-context";
import { Redirect } from "react-router-dom";

const ContractSettings = ({ open, onClose, contract }) => {
  const { currentUser, isTelegram } = useContext(AuthContext);
  const [redirectTo, setRedirectTo] = useState(null);
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }
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
          {!currentUser.e_mail.length && (
            <Popup
              content="Верифікуйте свій email"
              trigger={
                <Checkbox
                  label="Email"
                  name="email"
                  disabled
                  onClick={() => setRedirectTo("/settings")}
                />
              }
            />
          )}
          {currentUser.e_mail.length !== 0 && (
            <Checkbox label="Email" name="email" />
          )}
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
          {isTelegram && <Checkbox label="Telegram" name="telegram" />}
          {!isTelegram && (
            <Popup
              content="Зареєструйтесь у нашому telegram-боті"
              trigger={<Checkbox abel="Telegram" name="telegram" disabled />}
            />
          )}
        </div>
      </Modal.Header>
      <Modal.Actions>
        <Button primary content="Зберегти" />
      </Modal.Actions>
    </Modal>
  );
};

export default ContractSettings;
