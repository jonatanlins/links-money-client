import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Overview from "./pages/Overview";
import ViewPage from "./pages/ViewPage";
import CreatePage from "./pages/CreatePage";
import MosaicPage from "./pages/Mosaic";
import LandingPage from "./pages/LandingPage";

function PrivateRoute({
  component: Component,
  unauthenticated: Unauthenticated,
  ...args
}) {
  return (
    <Route
      {...args}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : Unauthenticated ? (
          <Unauthenticated {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/p/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function ControlPanel() {
  return (
    <Switch>
      <Route path="/p" exact component={Overview} />
      <Route path="/p/pages/new" component={CreatePage} />
      <Route path="/p/pages/:id" component={ViewPage} />

      <Redirect path="*" to="/p" />
    </Switch>
  );
}

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />

      <Route path="/p/signin" component={Login} />
      <Route path="/p/signup" component={Register} />
      <PrivateRoute path="/p" component={ControlPanel} />

      <Route path="/:id" component={MosaicPage} />

      <Redirect path="*" to="/" />
    </Switch>
  );
}

export default Routes;
