import React from "react";
import { Layout } from "antd";
import HeaderPage from "../../../components/Header";
import MenuPage from "./menu";
import FooterPage from "../../../components/Footer";

const { Content } = Layout;

function LayoutPage(props) {
  return (
    <>
      <Layout className="layout">
        <HeaderPage />
        <MenuPage />
        <Content style={{ padding: "70px 0px", backgroundColor: "white" }}>
          <div className="site-layout-content">{props.children}</div>
        </Content>
        <FooterPage />
      </Layout>
    </>
  );
}

export default React.memo(LayoutPage);
