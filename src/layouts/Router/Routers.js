import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";
import Contracts from "../../pages/Contracts/Contracts";
import PageWrapper from "../PageWrapper/PageWrapper";
import PageFooter from "../PageFooter/PageFooter";
import { AuthContext } from "../../context/auth/auth-context";
import { Segment } from "semantic-ui-react";

const Routers = () => {
  const { loadUser, isUserLoaded } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  if (!isUserLoaded) {
    return <Segment loading style={{ height: "100vh" }} />;
  }
  return (
    <BrowserRouter>
      <PageHeader />
      <PageWrapper>
        <Switch>
          <Route path="/" exact component={Contracts} />
          <Route path="/archives" component={() => <div>sadasdasd</div>} />
          <Route path="/settings" component={() => <div>settings</div>} />
          <Redirect to="/contracts" />
        </Switch>
      </PageWrapper>
      <PageFooter />
    </BrowserRouter>
  );
};

export default Routers;
