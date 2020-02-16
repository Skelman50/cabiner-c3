import React, { useContext, useEffect, Fragment } from "react";
import { AuthContext } from "../../../context/auth/auth-context";
import { ContractsContext } from "../../../context/contracts/contracts-context";
import { Segment } from "semantic-ui-react";
import BillsCardItem from "../../../components/archives/Bills/BillsCardItem/BillsCardItem";

const Bills = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    loadContracts,
    loadingContracts,
    contracts,
    clearContracts
  } = useContext(ContractsContext);

  useEffect(() => {
    if (!currentUser) return;
    loadContracts({ Ref_Key: currentUser.Ref_Key });
    return () => {
      clearContracts();
    };
  }, [loadContracts, currentUser, clearContracts]);

  return (
    <Fragment>
      <Segment
        className="segment-no-border no-padding"
        disabled={loadingContracts}
        loading={loadingContracts}
      >
        {contracts &&
          contracts.map(contract => (
            <BillsCardItem key={contract.Ref_Key} contract={contract} />
          ))}
      </Segment>
    </Fragment>
  );
};

export default Bills;
