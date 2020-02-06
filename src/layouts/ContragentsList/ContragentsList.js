import React from "react";
import { Dropdown } from "semantic-ui-react";
import { contragents } from "../../dummy/contragents";

const ContragentsList = () => {
  return (
    <Dropdown
      placeholder="Select Friend"
      fluid
      selection
      defaultValue={contragents[0].value}
      options={contragents}
      onChange={(e, data) => console.log(data.value)}
    />
  );
};

export default ContragentsList;
