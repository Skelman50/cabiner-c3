import React, { useContext } from "react";

import "./DropDownMenu.css";
import { Card, List } from "semantic-ui-react";
import { AuthContext } from "../../../context/auth/auth-context";

const DropDownMenu = ({ handleClose }) => {
  const { users, setCurrentUser } = useContext(AuthContext);

  return (
    <Card className="dropdown-menu-custom" style={{ width: "auto" }}>
      <List className="contragents-list">
        {users &&
          users.map(user => (
            <List.Item
              className="dropdown-custom-item"
              key={user.Ref_Key}
              onClick={() => {
                setCurrentUser(user);
                handleClose();
              }}
            >
              <List.Icon name="user" />
              <List.Content>{user.fullname}</List.Content>
            </List.Item>
          ))}
      </List>
    </Card>
  );
};

export default DropDownMenu;
