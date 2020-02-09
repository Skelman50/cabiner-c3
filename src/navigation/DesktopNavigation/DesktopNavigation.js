import React, { Fragment, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/auth-context";

const DesktopNavigation = () => {
  const { isLoggedIn, logOut } = useContext(AuthContext);
  return (
    <Fragment>
      {isLoggedIn && (
        <Fragment>
          <Menu.Item name="угоди" as={NavLink} to="/" exact />
          <Menu.Item name="архіви" as={NavLink} to="/archives" />
          <Menu.Item name="налаштування" as={NavLink} to="/settings" />
          <Menu.Item
            name="архіви"
            as={Link}
            content="Вихід"
            onClick={logOut}
            icon="log out"
            to="#"
          />
        </Fragment>
      )}
      {!isLoggedIn && (
        <Menu.Item
          name="вхід до особистого кабінету"
          as={NavLink}
          to="/login"
          exact
          icon="sign in"
        />
      )}
    </Fragment>
  );
};

export default DesktopNavigation;
