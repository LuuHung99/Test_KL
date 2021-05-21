import React from "react";
import "antd/dist/antd.css";
// import LayoutPage from "../common/layout";
import Product from "./products/product";
import Header from "./products/hd";

function Dashbroad(props) {

  return (
    <>
      <Header />
      <Product />
      {/* <FooterPage /> */}
     </> 
  );
}

export default Dashbroad;
