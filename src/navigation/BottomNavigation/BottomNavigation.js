import React from "react";
import { Menu } from "semantic-ui-react";
import "./BottomNavigation.css";

const BottomNavigation = ({ children }) => {
  return (
    <div className="bottom-navigation-wrapper">
      <Menu tabular className="bottom-navigation-menu">
        {children}
      </Menu>
    </div>
  );
};

export default BottomNavigation;
