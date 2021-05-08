import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Skeleton } from "antd";

const Login = lazy(() => import("../components/authen/login"));
const Register = lazy(() => import("../components/authen/register"));
const Dashbroad = lazy(() => import("../components/dashbroad/dashbroad"));

function MainRoute(props) {
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
        <Route path="/dashbroad">
            <Dashbroad />
        </Route>
      </Switch>
      </Suspense>

    </Router>
    
  );
}

export default MainRoute;
