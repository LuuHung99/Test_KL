import React from "react";
import "antd/dist/antd.css";
import { Layout} from "antd";
import HeaderPage from "./Header";
import FooterPage from "./Footer";

const { Content } = Layout;

function LayoutPage(props) {
  return (
    <Layout className="layout">
      <HeaderPage/>
        <Content>
          <div className="site-layout-content">{props.children}</div>
        </Content>
      <FooterPage />
    </Layout>
  );
}

export default React.memo(LayoutPage);
