import React, { useContext, useState } from "react";
import { Card, Header, Button, Icon } from "semantic-ui-react";
import { AuthContext } from "../../../context/auth/auth-context";

import "./SettingsContacts.css";
import EmailCardItem from "../../../components/settings/contacts/EmailCardItem";
import AddEmail from "./AddEmail/AddEmail";

const SettingsContacts = () => {
  const { currentUser } = useContext(AuthContext);
  const [addEmail, setAddEmail] = useState(false);

  if (addEmail) {
    return <AddEmail setAddEmail={setAddEmail} />;
  }
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
          <div>
            <Icon name="info" />
            Ще не додано жодної електронної адреси!
          </div>
        )}
        <div
          style={{
            width: "100%"
          }}
        >
          {currentUser &&
            currentUser.e_mail.length !== 0 &&
            currentUser.e_mail.map((item, idx) => (
              <EmailCardItem email={item} key={idx} />
            ))}
        </div>
      </Card.Content>
      <Card.Content
        style={{
          display: "flex",
          justifyContent: "flex-end",
          borderTop: "1px solid rgba(0,0,0,.1)",
          paddingTop: "1em"
        }}
      >
        <Button
          primary
          icon="add"
          content="Додати"
          onClick={() => setAddEmail(true)}
        />
      </Card.Content>
    </Card>
  );
};

export default SettingsContacts;
