import React, { Fragment } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const DesktopNavigation = () => {
  return (
    <Fragment>
      <Menu.Item name="угоди" as={NavLink} to="/" exact />
      <Menu.Item name="архіви" as={NavLink} to="/archives" />
      <Menu.Item name="налаштування" as={NavLink} to="/settings" />
      <Menu.Item
        name="архіви"
        as={Link}
        content="Вихід"
        icon="log out"
        to="#"
      />
    </Fragment>
  );
};

export default DesktopNavigation;
