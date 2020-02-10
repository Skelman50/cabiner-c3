import React from "react";

import "./ContragentsList.css";
import { Segment } from "semantic-ui-react";

const ContragentsList = ({ handleClickModal }) => {
  return (
    <Segment
      onClick={handleClickModal}
      className="header-dropdown no-radius no-padding"
    >
      <span>
        <i aria-hidden={"true"} className="users icon" />
        Контрагенти
      </span>
      <i
        aria-hidden={"true"}
        className="dropdown icon"
        style={{ marginRight: "0" }}
      />
    </Segment>
  );
};

export default ContragentsList;
