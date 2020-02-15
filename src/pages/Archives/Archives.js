import React, { useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Archives = props => {
  useEffect(() => {
    if (props.location.pathname === "/archives") {
      props.history.push("/archives/bills");
    }
  }, [props.location.pathname, props.history]);

  return (
    <Menu tabular>
      <Menu.Item
        name="Платежі"
        as={NavLink}
        to="/archives/bills"
        icon="money bill alternate"
      />
      <Menu.Item
        name="Акти та рахунки"
        as={NavLink}
        to="/archives/acts"
        icon="list"
      />
    </Menu>
  );
};

export default Archives;
