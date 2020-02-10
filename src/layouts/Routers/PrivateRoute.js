import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth/auth-context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedIn ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
