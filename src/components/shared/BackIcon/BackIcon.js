import React from "react";
import { Segment, Popup, Icon } from "semantic-ui-react";

const BackIcon = ({
  redirectTo,
  content = "Повернутися до вибору типів оплати",
  margin
}) => {
  return (
    <Segment
      className="segment-no-border no-padding"
      floated="right"
      style={{ margin: "0", marginLeft: margin }}
    >
      <Popup
        content={content}
        trigger={
          <Icon className="icon-back" name="reply" onClick={redirectTo} />
        }
      />
    </Segment>
  );
};

export default BackIcon;
