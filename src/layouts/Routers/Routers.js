import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";
import Contracts from "../../pages/Contracts/Contracts";
import PageWrapper from "../PageWrapper/PageWrapper";
import PageFooter from "../PageFooter/PageFooter";
import { AuthContext } from "../../context/auth/auth-context";
import PrivateRoute from "./PrivateRoute";
import Login from "../../pages/Login/Login";
import Payments from "../../pages/Payments/Payments";
import Liqpay from "../../pages/Liqpay/Liqpay";
import Privat from "../../pages/Privat/Privat";
import CheckOut from "../../pages/CheckOut/CheckOut";
import Bills from "../../pages/Archives/Bills/Bills";
import Acts from "../../pages/Archives/Acts/Acts";
import SettingsUsers from "../../pages/Settings/Users/SettingsUsers";
import SettingsContacts from "../../pages/Settings/Contacts/SettingsContacts";
import SettingsPassword from "../../pages/Settings/Password/SettingsPassword";
import InitPage from "../InitPage/InitPage";
import { Message } from "semantic-ui-react";

const Routers = ({ socket }) => {
  const {
    loadUser,
    isUserLoaded,
    refreshToken,
    currentUser,
    addEmail
  } = useContext(AuthContext);
  const [isAddEmail, setIsAddEmail] = useState(false);

  useEffect(() => {
    if (currentUser) {
      socket.removeListener("verifyEmail");
    }
    socket.on("verifyEmail", data => {
      if (currentUser && currentUser.phone === data.phonenumber) {
        addEmail(data);
      }
      if (currentUser && currentUser.Ref_Key === data.refKey) {
        setIsAddEmail(true);
      }
    });
  }, [socket, currentUser, addEmail]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    setInterval(() => {
      refreshToken();
    }, 60000 * 15);
  }, [refreshToken]);

  if (!isUserLoaded) {
    return <InitPage />;
  }
  return (
    <BrowserRouter>
      <PageHeader />
      <PageWrapper>
        {isAddEmail && (
          <Message
            icon="warning"
            info
            content="Пошта успішно додана"
            onDismiss={() => setIsAddEmail(false)}
          />
        )}
        <Switch>
          <PrivateRoute path="/" exact component={Contracts} />
          <PrivateRoute path="/archives/bills" component={Bills} />
          <PrivateRoute path="/archives/acts" component={Acts} />
          <PrivateRoute path="/settings/users" component={SettingsUsers} />
          <PrivateRoute
            exact
            path="/settings/password"
            component={SettingsPassword}
          />
          <PrivateRoute
            exact
            path="/settings/contacts"
            component={SettingsContacts}
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
          <Redirect from="/archives/" to="/archives/bills" />
          <Redirect from="/settings/" to="/settings/users" />
          <Redirect to="/" />
        </Switch>
      </PageWrapper>
      <PageFooter />
    </BrowserRouter>
  );
};

export default Routers;
