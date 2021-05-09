import React, { useState } from "react";
import "antd/dist/antd.css";

// import LayoutPage from "../common/layout";
import SideBar from "../common/Sidebar";
import Product from "../products/product";
import Title from "./title/hd";
import FooterPage from "../common/Footer";

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
