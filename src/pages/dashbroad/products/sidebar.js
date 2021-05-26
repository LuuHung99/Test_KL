import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Menu, Input } from "antd";
import { MenuOutlined, CloseOutlined,SearchOutlined } from "@ant-design/icons";
import {  Link, useRouteMatch, BrowserRouter as Router, Route  } from "react-router-dom";
import DetailProducts from "./products";

import { dataFake } from "../../../services/tree";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Products(props) {
  let match = useRouteMatch();
  const [searchSidebar, setSearchSidebar] = useState("");
  const [menus, setMenus] = useState(dataFake);
  const [selected, setSelected] = useState("");
  
  const handleProductOnClick = (selected, key) => {
    setSelected(selected, key);
  };

  //Side bar
  function renderProductList() {
    return (
      Array.isArray(menus) &&
      menus.map((text) => {
        if (text.subs.length > 0)
          return (
            <SubMenu key={text.id} title={text.title}>
              {Array.isArray(text.subs) &&
                text.subs.map((item) => {
                  return (
                    <Menu.Item
                      key={item.id}
                      onClick={() => handleProductOnClick(item)}
                    >
                      <Link to={`${match.path}${item.path}`}>{item.title}</Link>
                    </Menu.Item>
                  );
                })}
            </SubMenu>
          );
        return (
          <Menu.Item 
            key={text.id} 
            onClick={() => handleProductOnClick(text)}
          >
            <Link to={`${match.path}${text.path}`}>{text.title}</Link>
          </Menu.Item>
        );
      })
    );
  }
 
  return (
    <>
      {/* Sidebar */}

      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <MenuOutlined id="icon1" />
        <CloseOutlined id="icon2" />
      </label>

      <Layout id="sidebar-wrapper">
        <Sider className="sidebar_container">
          <div className="logo">
            <img src="images/male-farmer.svg" className="logo__img" alt="" />
            <p>Hi Hung</p>
          </div>
          <form type="submit">
            <Input
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                marginBottom: "10px",
                width: "95%",
              }}
              val={searchSidebar}
              // onPressEnter={(value) => onchangeSearchSidebar(value)}
              onChange={(e) => setSearchSidebar(e.target.value)}
            />
          </form>
          <Menu mode="inline">{renderProductList()}</Menu>
        </Sider>
      </Layout>
      <DetailProducts item={selected} />
    </>
  );
}

export default Products;
