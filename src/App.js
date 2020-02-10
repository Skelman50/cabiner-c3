import React from "react";
import Routers from "./layouts/Routers/Routers";
import AUthState from "./context/auth/auth-state";
import ContractsState from "./context/contracts/contracts-state";

function App() {
  return (
    <AUthState>
      <ContractsState>
        <Routers />
      </ContractsState>
    </AUthState>
  );
}

export default App;
