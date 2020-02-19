import React, { useContext } from "react";
import { Card, Header, Button, Icon } from "semantic-ui-react";
import { AuthContext } from "../../../context/auth/auth-context";

import "./SettingsContacts.css";
import EmailCardItem from "../../../components/settings/contacts/EmailCardItem";

const SettingsContacts = props => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <Card fluid>
      <Header
        className="settings-contacts-header"
        icon="phone"
        content={`Ваш телефон: ${currentUser && currentUser.phone}`}
      />
      <Header
        className="settings-contacts-header"
        icon="list ol"
        content={`Список електронних адрес:`}
      />
      <Card.Content>
        {(!currentUser || !currentUser.e_mail.length) && (
          <div style={{ marginBottom: "1em" }}>
            <Icon name="info" />
            Ще не додано жодної електронної адреси!
          </div>
        )}
        <div style={{ width: "100%" }}>
          {currentUser &&
            currentUser.e_mail.length !== 0 &&
            currentUser.e_mail.map(item => (
              <EmailCardItem email={item} key={item} />
            ))}
        </div>
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
