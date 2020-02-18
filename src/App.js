import React from "react";
import io from "socket.io-client";
import Routers from "./layouts/Routers/Routers";
import AUthState from "./context/auth/auth-state";
import ContractsState from "./context/contracts/contracts-state";
import { socketURL } from "./config/config";

function App() {
  const socket = io(`${socketURL}`);
  return (
    <AUthState>
      <ContractsState>
        <Routers socket={socket} />
      </ContractsState>
    </AUthState>
  );
}

export default App;
