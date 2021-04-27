import React from "react";
import Login from "../authen/login";
import Register from "../authen/register";
import HeaderTest from "../Header/index";
import FooterTest from "../Footer/index";
import Dashbroad from "../dashbroad/dashbroad";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function MainRoute(props) {
  return (
    <Router>
      <Route path="/">
        <HeaderTest />
      </Route>
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
      <Route path="/">
        <FooterTest />
      </Route>
    </Router>
  );
}

export default MainRoute;
