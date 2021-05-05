import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Menu, Input, Button } from "antd";

// import initData from "./initData";

const { Header, Content, Footer, Sider } = Layout;



function Products(props) {
  // const [collapse, setCollapse] = useState(false);

  return (
    <Layout>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <div className="header_fix">
          <ul>
            <li>
              <Button>Cam sành</Button>
            </li>
          </ul>
        </div>
        <div className="site-layout-background" style={{ padding: 0 }}></div>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            backgroundColor: "#fff",
            paddingTop: "100px",
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            <br />
            Really
            <br />
            ...
            <br />
            ...
            <br />
            ... ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ... ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ... ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            ...
            <br />
            content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Products;
