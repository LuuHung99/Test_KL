import React from "react";
import "antd/dist/antd.css";
// import LayoutPage from "../common/layout";
import Sidebar from "./products/sidebar";
import Header from "./products/hd"; 

function Dashbroad(props) {

  return (
    <>
      <Header />
      <Sidebar />
      {/* <FooterPage /> */}
     </> 
  );
}

export default Dashbroad;
