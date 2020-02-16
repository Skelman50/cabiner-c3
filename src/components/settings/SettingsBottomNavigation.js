import React from "react";
import BottomNavigation from "../../navigation/BottomNavigation/BottomNavigation";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const SettingsBottomNavigation = () => {
  return (
    <BottomNavigation>
      <Menu.Item
        name="Контрагенти"
        as={NavLink}
        to="/settings/users"
        icon="users"
        className="bottom-nav"
      />
      <Menu.Item
        name="Контакти"
        as={NavLink}
        to="/settings/contacts"
        icon="mail"
        className="bottom-nav"
      />
      <Menu.Item
        name="Пароль"
        as={NavLink}
        to="/settings/password"
        icon="key"
        className="bottom-nav"
      />
    </BottomNavigation>
  );
};

export default SettingsBottomNavigation;
