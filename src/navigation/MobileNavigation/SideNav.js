import React, { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import yavir from "../../assets/images/yavir.png";

import "./SideNav.css";
import { Icon, Image, Menu } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/auth-context";

const SideDrawer = ({ show, onClick }) => {
  const { isLoggedIn, logOut } = useContext(AuthContext);
  const content = (
    <CSSTransition
      in={show}
      timeout={1000}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>
        <div className="sidenav-header">
          <Icon name="close" inverted className="icon-close" />
          <Image src={yavir} alt="" style={{ height: "80px" }} />
        </div>

        <Menu pointing secondary vertical style={{ width: "100%" }}>
          {isLoggedIn && (
            <Fragment>
              <Menu.Item
                as={NavLink}
                to="/"
                exact
                name="Угоди"
                icon="list alternate outline"
              />
              <Menu.Item
                name="Архіви"
                icon="archive"
                as={NavLink}
                to="/archives/bills"
              />
              <Menu.Item
                name="Налаштування"
                icon="settings"
                as={NavLink}
                to="/settings"
              />
              <Menu.Item
                name="Вихід"
                icon="log out"
                as={Link}
                to="#"
                onClick={logOut}
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
        </Menu>
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
