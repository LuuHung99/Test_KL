import React, { Suspense, lazy } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Sidebar from "./products/sidebar";
import Header from "./products/hd";
// import DetailProducts from "./products/products";
const DetailProducts = lazy(() => import("./products/products"));

function Dashbroad(props) {
  const match = useRouteMatch();
  return (
    <>
      <Header />
      <Sidebar>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={`${match.path}/:id`} component={DetailProducts} />
          </Switch>
        </Suspense>
      </Sidebar>
    </>
  );
}

export default Dashbroad;
