import React from "react";
import { Segment, Popup, Icon } from "semantic-ui-react";

const BackIcon = ({ redirectTo }) => {
  return (
    <Segment
      className="segment-no-border no-padding"
      floated="right"
      style={{ margin: "0" }}
    >
      <Popup
        content="Повернутися до вибору типів оплати"
        trigger={
          <Icon className="icon-back" name="reply" onClick={redirectTo} />
        }
      />
    </Segment>
  );
};

export default BackIcon;
