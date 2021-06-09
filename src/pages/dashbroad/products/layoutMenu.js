import React from "react";
import "./css/product.css";
import { Layout } from "antd";
import FooterPage from "./Footer";
import HeaderPage from "./hd";
const { Content } = Layout;

function LayoutPage(props) {
  return (
    <Layout
      style={{
        padding: "90px 0px",
        backgroundColor: "#fff",
      }}
    >
      <HeaderPage />
      <Content>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <FooterPage />
    </Layout>
  );
}

export default LayoutPage;
