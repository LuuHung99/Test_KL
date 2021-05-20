import React from "react";
import "antd/dist/antd.css";

// import LayoutPage from "../common/layout";
import Product from "./products/product";
import Title from "./products/hd";
import FooterPage from "./products/Footer";
import DetailProducts from "./products/detail";

function Dashbroad(props) {
  return (
    <>
      <Title />
      <Product>
        
      </Product>
      {/* <DetailProducts path="/cay-than-go/:id" /> */}
      <FooterPage />
    </>
  );
}

export default Dashbroad;
