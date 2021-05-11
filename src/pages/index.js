import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Skeleton } from "antd";

const Login = lazy(() => import("./authen/login"));
const Register = lazy(() => import("./authen/register"));
const Dashbroad = lazy(() => import("./dashbroad/index"));
const HomePage = lazy(() => import("./home/index"));

function AppRouter(props) {
  return (
    <Router>
      <Suspense fallback={<Skeleton active />}>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/dashbroad">
            <Dashbroad />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
