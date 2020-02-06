import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";
import ContragentsList from "../ContragentsList/ContragentsList";
import Contracts from "../../pages/Contracts/Contracts";

const Routers = props => {
  return (
    <BrowserRouter>
      <PageHeader />
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <ContragentsList />
        <Switch>
          <Route path="/contracts" component={Contracts} />
          <Redirect to="/contracts" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routers;
