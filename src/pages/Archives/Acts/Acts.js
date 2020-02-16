import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth/auth-context";
import { Segment } from "semantic-ui-react";
import { ContractsContext } from "../../../context/contracts/contracts-context";
import ActCardItem from "../../../components/archives/Acts/ActsCardItem/ActsCardItem";

const Acts = () => {
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
            <ActCardItem contract={contract} key={contract.Ref_Key} />
          ))}
      </Segment>
    </Fragment>
  );
};

export default Acts;
