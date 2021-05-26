import React from "react";
import "antd/dist/antd.css";
import "./css/product.css";
// import LayoutPage from "../common/layout";
import { Layout } from "antd";
import HeaderPage from "./hd";
import Sidebar from "./sidebar";
const {  Content } = Layout;

function LayoutPage(props) {
  return (
    <Layout className="site-layout"
    style={{
      paddingTop: "90px",
      backgroundColor: "#BDBDBD",
    }}>
      <HeaderPage />
      <Sidebar />
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">{props.children}</div>
      </Content>
    </Layout>
  );
}

export default LayoutPage;
