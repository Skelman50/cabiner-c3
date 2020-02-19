import React, { useContext } from "react";
import { Card, Header, Button, Icon, List } from "semantic-ui-react";
import { AuthContext } from "../../../context/auth/auth-context";

import "./SettingsContacts.css";

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
            currentUser.e_mail.length &&
            currentUser.e_mail.map(item => (
              <div
                key={item}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingTop: "0.5em",
                  paddingBottom: "0.5em"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Icon name="mail" />
                  <div style={{ width: "20rem", wordWrap: "break-word" }}>
                    {item}
                  </div>
                </div>
                <List.Icon name="delete" />
              </div>
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
