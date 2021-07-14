import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Sidebar from "./products/sidebar";
import Header from "./products/hd";
import DetailProducts from "./products/products";

function Dashbroad(props) {
  const match = useRouteMatch();
  return (
    <>
      <Header />
      <Sidebar>
          <Route path={`${match.path}/:id`} component={DetailProducts} />
      </Sidebar>
    </>
  );
}

export default Dashbroad;
