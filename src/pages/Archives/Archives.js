import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import "./Archives.css";

const Archives = ({ style }) => {
  return (
    <div style={{ padding: "1em 0", background: "white" }}>
      <Menu tabular style={style}>
        <Menu.Item
          name="Платежі"
          as={NavLink}
          to="/archives/bills"
          icon="money bill alternate"
          className="archives-nav"
        />
        <Menu.Item
          name="Акти та рахунки"
          as={NavLink}
          to="/archives/acts"
          icon="list"
          className="archives-nav"
        />
      </Menu>
    </div>
  );
};

export default Archives;
