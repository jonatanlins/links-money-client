import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Overview from "./pages/Overview";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import CreateSocialButton from "./pages/CreateSocialButton";
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
      <Route path="/p/pages/new" exact component={CreatePage} />
      <Route path="/p/pages/:id/edit" exact component={EditPage} />
      <Route
        path="/p/pages/:id/socialButtons/new"
        exact
        component={CreateSocialButton}
      />

      <Redirect path="*" to="/p" />
    </Switch>
  );
}

function Routes() {
  return (
    <Switch>
      <Route path="/p/signin" exact component={Login} />
      <Route path="/p/signup" exact component={Register} />
      <PrivateRoute path="/p" component={ControlPanel} />

      <Route path="/" exact component={LandingPage} />
      <Route path="/:id" exact component={MosaicPage} />

      <Redirect path="*" to="/" />
    </Switch>
  );
}

export default Routes;
