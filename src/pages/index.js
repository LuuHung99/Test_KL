import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes } from "../routers/index";
import PrivateRoute from "../routers/privateRouter";

const Login = lazy(() => import("./authen/login"));
const Register = lazy(() => import("./authen/register"));

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
          <Route>
            {routes.map((route, index) => {
              return (
                <PrivateRoute
                  key={index}
                  path={route.root + route.path}
                  exact={route.exact}
                  component={route.component}
                />
              );
            })}
            </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
