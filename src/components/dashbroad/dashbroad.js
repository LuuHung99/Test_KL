import React, { useState } from "react";
import "antd/dist/antd.css";

// import Footer from "../common/Footer";
import Header from "../common/Header";
import SideBar from "../common/Sidebar";
import Product from "../products/product";

import {
  BrowserRouter as Router,
} from "react-router-dom";

function Dashbroad(props) {
  return (
    <Router>
        <Header />
        <SideBar />
        <Product></Product>
        
    </Router>
  );
}

export default Dashbroad;
