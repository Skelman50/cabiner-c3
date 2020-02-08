import React from "react";
import { Segment } from "semantic-ui-react";

import "./PageWrapper.css";

const PageWrapper = props => {
  return (
    <Segment className="segment-no-border max-width no-padding page-wrapper">
      {props.children}
    </Segment>
  );
};

export default PageWrapper;
