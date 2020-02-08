import React, { useContext } from "react";

import "./ContragentsList.css";
import { Segment } from "semantic-ui-react";
import { ContractsContext } from "../../../context/contracts/contracts-context";

const ContragentsList = ({ handleClickModal }) => {
  const { loadingContracts } = useContext(ContractsContext);
  return (
    <Segment
      disabled={loadingContracts}
      loading={loadingContracts}
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
