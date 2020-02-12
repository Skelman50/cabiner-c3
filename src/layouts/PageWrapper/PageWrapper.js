import React from "react";
import { useLocation } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import "./PageWrapper.css";

const PageWrapper = props => {
  const location = useLocation();
  return (
    <Segment
      className={`segment-no-border max-width no-padding page-wrapper${
        location.pathname === "/login" ? " login" : ""
      }`}
    >
      {props.children}
    </Segment>
  );
};

export default PageWrapper;
