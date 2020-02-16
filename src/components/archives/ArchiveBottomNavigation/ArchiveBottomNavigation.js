import React from "react";
import BottomNavigation from "../../../navigation/BottomNavigation/BottomNavigation";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const ArchiveBottomNavigation = () => {
  return (
    <BottomNavigation>
      <Menu.Item
        name="Платежі"
        as={NavLink}
        to="/archives/bills"
        icon="money bill alternate"
        className="bottom-nav"
      />
      <Menu.Item
        name="Акти та рахунки"
        as={NavLink}
        to="/archives/acts"
        icon="list"
        className="bottom-nav"
      />
    </BottomNavigation>
  );
};

export default ArchiveBottomNavigation;
