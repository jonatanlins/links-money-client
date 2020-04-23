import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import Login from "./pages/Login";
import Overview from "./pages/Overview";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import CreateSocialButton from "./pages/CreateSocialButton";
import CreateLink from "./pages/CreateLink";
import PageListPage from "./pages/PageList";
import MosaicPage from "./pages/Mosaic";

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

      <PrivateRoute path="/pages/new" exact component={CreatePage} />
      <PrivateRoute path="/pages/:id/edit" exact component={EditPage} />
      {/* <PrivateRoute
        path="/pages/:id/socialButtons/new"
        exact
        component={CreateSocialButton}
      /> */}
      <PrivateRoute path="/pages/:id/links/new" exact component={CreateLink} />
      <Route path="/pagelist" exact component={PageListPage} />
      <Route path="/:id" exact component={MosaicPage} />

      <Redirect path="*" to="/" />
    </Switch>
  );
}

export default Routes;
