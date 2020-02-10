import React, { useContext, useEffect } from "react";
import CardItem from "../../containers/contracts/CardItem";
import { Segment } from "semantic-ui-react";
import { ContractsContext } from "../../context/contracts/contracts-context";
import { AuthContext } from "../../context/auth/auth-context";

const Contracts = () => {
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
    <Segment
      className="segment-no-border no-padding"
      disabled={loadingContracts}
      loading={loadingContracts}
    >
      {contracts &&
        contracts.map(contract => (
          <CardItem key={contract.Ref_Key} contract={contract} />
        ))}
    </Segment>
  );
};

export default Contracts;
