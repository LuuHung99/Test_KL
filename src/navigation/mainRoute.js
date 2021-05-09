import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Skeleton } from "antd";

const Login = lazy(() => import("../components/authen/login"));
const Register = lazy(() => import("../components/authen/register"));
const Dashbroad = lazy(() => import("../components/dashbroad/dashbroad"));
const HomePage = lazy(() => import("../components/home/index"));

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
        <Route path="/home">
          <HomePage />
        </Route>
        
      </Switch>
      </Suspense>

    </Router>
    
  );
}

export default MainRoute;
