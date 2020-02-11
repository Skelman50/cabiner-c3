import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";
import Contracts from "../../pages/Contracts/Contracts";
import PageWrapper from "../PageWrapper/PageWrapper";
import PageFooter from "../PageFooter/PageFooter";
import { AuthContext } from "../../context/auth/auth-context";
import { Segment } from "semantic-ui-react";
import PrivateRoute from "./PrivateRoute";
import Login from "../../pages/Login/Login";
import Payments from "../../pages/Payments/Payments";
import Liqpay from "../../pages/Liqpay/Liqpay";
import Privat from "../../pages/Privat/Privat";
import CheckOut from "../../pages/CheckOut/CheckOut";

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
          <PrivateRoute path="/" exact component={Contracts} />
          <PrivateRoute
            path="/archives"
            component={() => <div>sadasdasd</div>}
          />
          <PrivateRoute
            path="/settings"
            component={() => <div>settings</div>}
          />
          <PrivateRoute path="/payments" exact component={Payments} />
          <PrivateRoute path="/payments/liqpay" exact component={Liqpay} />
          <PrivateRoute
            path="/payments/liqpay/checkout"
            exact
            component={CheckOut}
          />
          <PrivateRoute path="/payments/privat" exact component={Privat} />
          <Route path="/login" component={Login} />
          <Redirect to="/" />
        </Switch>
      </PageWrapper>
      <PageFooter />
    </BrowserRouter>
  );
};

export default Routers;
