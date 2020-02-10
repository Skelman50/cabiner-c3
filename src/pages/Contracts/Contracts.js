import React, { useContext, useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { ContractsContext } from "../../context/contracts/contracts-context";
import { AuthContext } from "../../context/auth/auth-context";
import CardItem from "../../components/contracts/CardItem";
import { Redirect } from "react-router-dom";

const Contracts = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    loadContracts,
    loadingContracts,
    contracts,
    clearContracts,
    setCurrentContract
  } = useContext(ContractsContext);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    loadContracts({ Ref_Key: currentUser.Ref_Key });
    return () => {
      clearContracts();
    };
  }, [loadContracts, currentUser, clearContracts]);

  const handleClickPaymentButton = contract => {
    setCurrentContract(contract);
    setIsPaymentClicked(true);
  };

  if (isPaymentClicked) {
    return <Redirect to="/payments" />;
  }

  return (
    <Segment
      className="segment-no-border no-padding"
      disabled={loadingContracts}
      loading={loadingContracts}
    >
      {contracts &&
        contracts.map(contract => (
          <CardItem
            key={contract.Ref_Key}
            contract={contract}
            handleClickPaymentButton={handleClickPaymentButton}
          />
        ))}
    </Segment>
  );
};

export default Contracts;
