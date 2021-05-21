import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Login = lazy(() => import("./authen/login"));
const Register = lazy(() => import("./authen/register"));
const Dashbroad = lazy(() => import("./dashbroad/index"));
const HomePage = lazy(() => import("./home/index"));
// const DetailProducts = lazy(() => import("./dashbroad/products/detail"));

function AppRouter(props) {
  // let path = useRouteMatch();
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
