import React from "react";
import Login from "../components/authen/login";
import Register from "../components/authen/register";
import Dashbroad from "../components/dashbroad/dashbroad";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function MainRoute(props) {
  return (
    <Router>
      
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

    </Router>
  );
}

export default MainRoute;
