import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Button } from "antd";

import { initData } from "../../../services/api";

const { Content } = Layout;

function Products(props) {
  // const [collapse, setCollapse] = useState(false);
  const [data, setData] = useState(initData);
  function renderList() {
    return (
      Array.isArray(data) &&
      data
        .filter((x) => x.id === 2)
        .map((text, index) => {
          return (
            <ul key={index}>
              {Array.isArray(text.titles) &&
                text.titles.map((item, index) => {
                  return (
                    <li key={index}>
                      {Array.isArray(item.details) &&
                        item.details.map((text, index) => {
                          return <Button key={index} className="btn-button">{text.title}</Button>;
                        })}
                    </li>
                  );
                })}
            </ul>
          );
        })
    );
  }
  function renderDetailsList() {
    return (
      <div
        className="site-layout-background"
        style={{ padding: 24, textAlign: "center" }}
      >
        ...
        <br />
        Really
        <br />
        ...
        <br />
        ...
        <br />
        ...
        <br />
        long
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
        ...
        <br />
        ...
        <br />
        content
      </div>
    );
  }

  return (
    <>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <div className="header_fix">{renderList()}</div>
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
            {renderDetailsList()}
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default Products;
