import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth/auth-context";
import { Card, List, Header } from "semantic-ui-react";

const SettingsUsers = () => {
  const { users } = useContext(AuthContext);
  return (
    <Card fluid>
      <Header
        style={{ margin: "0", padding: "1em 1em" }}
        content="Доступні контрагенти"
        icon="users"
      />
      <Card.Content>
        <List>
          {users.map(item => (
            <List.Item
              key={item.Ref_Key}
              icon="user"
              content={item.fullname}
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "0.25em",
                paddingBottom: "0.25em"
              }}
            />
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

export default SettingsUsers;
