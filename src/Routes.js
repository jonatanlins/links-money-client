import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import Login from "./pages/Login";
import Overview from "./pages/Overview";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import CreateSocialButton from "./pages/CreateSocialButton";
import PageListPage from "./pages/PageList";
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
              pathname: "/login",
              state: { from: props.location },
            }}
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

      <PrivateRoute
        path="/"
        exact
        component={Overview}
        unauthenticated={LandingPage}
      />

      <PrivateRoute path="/pages/new" exact component={CreatePage} />
      <PrivateRoute path="/pages/:id/edit" exact component={EditPage} />
      <PrivateRoute
        path="/pages/:id/socialButtons/new"
        exact
        component={CreateSocialButton}
      />
      <Route path="/pagelist" exact component={PageListPage} />
      <Route path="/:id" exact component={MosaicPage} />

      <Redirect path="*" to="/" />
    </Switch>
  );
}

export default Routes;
