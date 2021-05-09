import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import HeaderPage from "../../common/Header";
import MenuPage from "./menu";
import FooterPage from "../../common/Footer";

const { Header, Content, Footer } = Layout;

function LayoutPage(props) {
  return (
    <Layout className="layout">
      <HeaderPage />
      <MenuPage />
      <Content style={{ padding: "50px", backgroundColor: "white" }}>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <FooterPage />
    </Layout>
  );
}

export default React.memo(LayoutPage);
