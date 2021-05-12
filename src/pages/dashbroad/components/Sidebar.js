import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/sidebar.css";
// import Data from "../../api/index";
import { Layout, Menu, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import {initData} from "../../../services/api";

const {  Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar(props) {
  // const [collapse, setCollapse] = useState(false);
  const [data, setData] = useState(initData);

  function renderProductList() {
    return (
      Array.isArray(data) &&
      data.map((text) => {
        return (
          <SubMenu key={text.id} title={text.names}>
            {Array.isArray(text.titles) &&
              text.titles.map((item) => {
                return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
              })}
          </SubMenu>
        );
      })
    );
  }

  return (
    <Layout>
      <Sider
        style={{
          marginTop: "65px",
          overflow: "auto",
          height: "91vh",
          position: "fixed",
          left: 0,
          backgroundColor: "#fff",
        }}
        className="site-layout-sider-light sidebar-wrapper"
      >
        <div className="logo">
          <img src="images/male-farmer.svg" className="logo__img" alt="" />
          <p>Hi Hung</p>
        </div>

        <Input
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
          style={{
            paddingLeft: "5px",
            paddingRight: "5px",
            marginBottom: "10px",
            width: "95%",
          }}
        />
        <Menu theme="light" mode="inline">
          {renderProductList()}
        </Menu>
      </Sider>

    </Layout>
  );
}

export default Sidebar;
