import React, { useContext } from "react";
import { Card, Header, Button, Icon } from "semantic-ui-react";
import { AuthContext } from "../../../context/auth/auth-context";

const SettingsContacts = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <Card fluid>
      <Header
        style={{ margin: "0", padding: "1em 1em", display: "flex" }}
        icon="phone"
        content={`Ваш телефон: +380666634078`}
      />
      <Header
        style={{ margin: "0", padding: "1em 1em", display: "flex" }}
        icon="mail"
        content={`Список електронних адрес:`}
      />
      <Card.Content>
        {(!currentUser || !currentUser.e_mail.length) && (
          <div>
            <Icon name="info" />
            Ще не додано жодної електронної адреси!
          </div>
        )}
        <Button primary icon="add" content="Додати" floated="right" />
      </Card.Content>
    </Card>
  );
};

export default SettingsContacts;
