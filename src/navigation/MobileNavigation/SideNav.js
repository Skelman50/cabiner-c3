import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import yavir from "../../assets/images/yavir.png";

import "./SideNav.css";
import { Icon, Image, Menu } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const SideDrawer = ({ show, onClick }) => {
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
          <Menu.Item
            as={NavLink}
            to="/"
            exact
            name="Угоди"
            icon="list alternate outline"
          />
          <Menu.Item name="Архіви" icon="archive" as={NavLink} to="/archives" />
          <Menu.Item
            name="Налаштування"
            icon="settings"
            as={NavLink}
            to="/settings"
          />
          <Menu.Item name="Вихід" icon="log out" as={Link} to="#" />
        </Menu>
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
