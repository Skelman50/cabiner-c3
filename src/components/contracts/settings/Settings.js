import React, { useContext, useState, useEffect } from "react";
import { Modal, Header, Checkbox, Button, Popup } from "semantic-ui-react";

import "./Settings.css";
import { AuthContext } from "../../../context/auth/auth-context";
import { Redirect } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";

const ContractSettings = ({ open, onClose, contract, data, setUpdated }) => {
  const { currentUser, isTelegram } = useContext(AuthContext);
  const [{ response, isLoading }, doFetch] = useFetch();
  const [redirectTo, setRedirectTo] = useState(null);
  const [{ email, medoc, telegramm }, setCheckBoxes] = useState({
    email: false,
    medoc: false,
    telegramm: false
  });

  useEffect(() => {
    if (!response) return;
    onClose();
    setUpdated(true);
  }, [response, onClose, setUpdated]);

  useEffect(() => {
    if (!data) return;
    setCheckBoxes({
      email: data.billEmail,
      medoc: data.billMedok,
      telegramm: data.debtTelegram
    });
  }, [data]);

  const handleChange = data => {
    setCheckBoxes(prevState => ({
      ...prevState,
      [data.name]: data.checked
    }));
  };

  const handleClick = () => {
    doFetch({
      url: "api/settings",
      data: { email, medoc, telegramm, refKey: contract.Ref_Key },
      method: "PUT"
    });
  };

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
            <Checkbox
              label="Email"
              checked={email}
              name="email"
              onChange={(e, data) => handleChange(data)}
            />
          )}
        </div>
        <div>
          <Checkbox
            label="MEDOK"
            name="medoc"
            checked={medoc}
            onChange={(e, data) => handleChange(data)}
          />
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
          {isTelegram && (
            <Checkbox
              label="Telegram"
              name="telegramm"
              checked={telegramm}
              onChange={(e, data) => handleChange(data)}
            />
          )}
          {!isTelegram && (
            <Popup
              content="Зареєструйтесь у нашому telegram-боті"
              trigger={<Checkbox label="Telegram" name="telegramm" disabled />}
            />
          )}
        </div>
      </Modal.Header>
      <Modal.Actions>
        <Button
          primary
          content="Зберегти"
          loading={isLoading}
          disabled={isLoading}
          onClick={handleClick}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ContractSettings;
