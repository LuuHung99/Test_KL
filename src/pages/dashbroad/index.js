import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "antd/dist/antd.css";
import Sidebar from "./products/sidebar";
import Header from "./products/hd";
import DetailProducts from "./products/products";

function Dashbroad(props) {
  const match = useRouteMatch();

  return (
    <>
      <Header />
      <Sidebar>
        <Switch>
          <Route path={`${match.path}/:id`} component={DetailProducts} />
        </Switch>
      </Sidebar>
    </>
  );
}

export default Dashbroad;
