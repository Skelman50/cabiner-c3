import React, { useContext } from "react";
import { Card, Header, Button, Icon } from "semantic-ui-react";
import { AuthContext } from "../../../context/auth/auth-context";

import "./SettingsContacts.css";

const SettingsContacts = props => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Card fluid>
      <Header
        className="settings-contacts-header"
        icon="phone"
        content={`Ваш телефон: ${currentUser && currentUser.phone}`}
      />
      <Header
        className="settings-contacts-header"
        icon="mail"
        content={`Список електронних адрес:`}
      />
      <Card.Content>
        {(!currentUser || !currentUser.e_mail.length) && (
          <div style={{ marginBottom: "1em" }}>
            <Icon name="info" />
            Ще не додано жодної електронної адреси!
          </div>
        )}
        <Button
          primary
          icon="add"
          content="Додати"
          floated="right"
          onClick={() => props.history.push("/settings/contacts/addemail")}
        />
      </Card.Content>
    </Card>
  );
};

export default SettingsContacts;
