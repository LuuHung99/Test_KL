import React, { useState } from "react";
import "antd/dist/antd.css";

// import LayoutPage from "../common/layout";
import SideBar from "./components/Sidebar";
import Product from "./products/product";
import Title from "./components/hd";
import FooterPage from "../../components/Footer";

import { BrowserRouter as Router } from "react-router-dom";

function Dashbroad(props) {
  return (
    <Router>
      <Title />
      <SideBar />
      <Product></Product>
      <FooterPage />
    </Router>
  );
}

export default Dashbroad;
