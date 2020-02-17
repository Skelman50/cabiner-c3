import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth/auth-context";
import { Card, List, Header } from "semantic-ui-react";

const SettingsUsers = () => {
  const { users } = useContext(AuthContext);
  return (
    <Card fluid>
      <Header style={{ margin: "0", padding: "1em 1em" }}>
        Доступні контрагенти
      </Header>
      <Card.Content>
        <List>
          {users.map(item => (
            <List.Item key={item.Ref_Key} icon="user" content={item.fullname} />
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

export default SettingsUsers;
