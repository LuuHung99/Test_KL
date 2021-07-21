import React, { useState } from "react";
import "./css/product.css";
import { Layout, Menu, Input } from "antd";
import {
  AlignRightOutlined,
  AlignLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Products(props) {
  let match = useRouteMatch();
  const [searchSidebar, setSearchSidebar] = useState("");
  const tokenUser = JSON.parse(window.localStorage.user);
  const data = useSelector(state=>state.products.sidebar);

  const handleClickTab = (item) => {
    const tabs = window.sessionStorage.getItem("tabs");
    const list = JSON.parse(tabs).data;
    const find = list.filter((i) => i === item.url);
    if (find.length === 0) {
      window.sessionStorage.tabs = JSON.stringify({
        data: [...list, item],
      });
    }
  };

  function renderProductList() {
    return data
      ? data
          .filter((val) =>
            val.title.toLowerCase().includes(searchSidebar.toLowerCase())
              ? val
              : null
          )
          .map((text) => {
            if (text.subs.length > 0)
              return (
                <SubMenu key={text.id} title={text.title}>
                  {text.subs.map((item) => {
                    if (item.activated === true)
                      return (
                        <Menu.Item
                          key={item.id}
                          path={item.url}
                          onClick={() => handleClickTab(item)}
                        >
                          <Link
                            to={`${match.url}/${item.url}`}
                            style={{ fontSize: "16px", color: "#fff" }}
                          >
                            {item.title}
                          </Link>
                        </Menu.Item>
                      );
                    return null;
                  })}
                </SubMenu>
              );
            if (text.activated === true) {
              return (
                <Menu.Item
                  key={text.id}
                  path={text.url}
                  onClick={() => handleClickTab(text)}
                >
                  <Link
                    to={`${match.url}/${text.url}`}
                    style={{ color: "#fff" }}
                  >
                    {text.title}
                  </Link>
                </Menu.Item>
              );
            }
            return null;
          })
      : null;
  }
  return (
    <>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <AlignLeftOutlined id="icon1" />
        <AlignRightOutlined id="icon2" />
      </label>

      <Layout id="sidebar-wrapper">
        <Sider className="sidebar_container">
          <div className="logo">
            <img src={tokenUser.avatarUrl} className="logo__img" alt="" />
            <p style={{ color: "white", textTransform: "capitalize" }}>
              Hi {tokenUser.fullname}
            </p>
          </div>
          <Input
            type="text"
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined style={{ fontSize: "20px" }} />}
            className="search_sidebar"
            value={searchSidebar}
            onChange={(e) => setSearchSidebar(e.target.value)}
          />
          <Menu
            mode="inline"
            style={{ marginTop: "10px" }}
            className="sidebar_menus"
            triggerSubMenuAction="hover"
          >
            {renderProductList()}
          </Menu>
        </Sider>
        <div className="sidebar_image">
          <img
            src={tokenUser.avatarUrl}
            alt=""
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100px",
            }}
          />
        </div>
      </Layout>

      {props.children}
    </>
  );
}

export default Products;
