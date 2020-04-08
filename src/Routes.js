import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import Login from "./pages/Login";
import Overview from "./pages/Overview";

function PrivateRoute({ component: Component, ...args }) {
  return (
    <Route
      {...args}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function Routes() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />

      <PrivateRoute path="/" exact component={Overview} />

      <Redirect path="*" to="/" />
    </Switch>
  );
}

export default Routes;
