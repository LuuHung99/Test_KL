import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Login = lazy(() => import("./authen/login"));
const Register = lazy(() => import("./authen/register"));
const Dashbroad = lazy(() => import("./dashbroad/index"));
const Logout = lazy(() => import("./authen/login"));

function AppRouter() {
  return (
    <Router>
      <Suspense
        fallback={
          <h1 style={{ textAlign: "center", marginTop: "40px" }}>
            Loading ...
          </h1>
        }
      >
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashbroad">
            <Dashbroad />
          </Route>
          <Route path="/">
            <Logout />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
