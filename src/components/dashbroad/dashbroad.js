import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";

import Footer from "../common/Footer";
import Header from "../common/Header";
import SideBar from "../common/Sidebar";
import Product from "../products/product";

import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";

function Dashbroad(props) {
  let { path, url } = useRouteMatch();
  return (
    <Router>
      <Layout>
        <Header />
        <Layout>
          <Switch>
            <Route path="/dashbroad">
              <>
                <SideBar />
                <Product></Product>
              </>
            </Route>
          </Switch>
        </Layout>
        <Footer />
      </Layout>
    </Router>
  );
}

export default Dashbroad;
