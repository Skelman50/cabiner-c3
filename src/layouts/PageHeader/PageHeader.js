import React, { Fragment } from "react";
import { Segment, Menu, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import yavir from "../../assets/images/yavir.png";

const PageLayout = props => {
  return (
    <Fragment>
      <Segment
        inverted
        style={{
          borderRadius: "0",
          boxShadow: "none"
        }}
      >
        <Menu
          inverted
          pointing
          secondary
          style={{
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >
          {/* <Menu.Item name="контрагенти" as={NavLink} to="/" exact /> */}
          <Menu.Item name="угоди" as={NavLink} to="/contracts" />
          <Menu.Item name="архіви" as={NavLink} to="/friends" />
          <Menu.Menu position="right">
            <Image src={yavir} alt="" style={{ height: "50px" }} />
          </Menu.Menu>
        </Menu>
      </Segment>
    </Fragment>
  );
};

export default PageLayout;
