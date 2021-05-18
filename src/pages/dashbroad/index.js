import React from "react";
import "antd/dist/antd.css";

// import LayoutPage from "../common/layout";
import Product from "./products/product";
import Title from "./products/hd";
import FooterPage from "./products/Footer";

import { BrowserRouter as Router } from "react-router-dom";

function Dashbroad(props) {
  return (
    <Router>
      <Title />
      <Product></Product>
      <FooterPage />
    </Router>
  );
}

export default Dashbroad;
