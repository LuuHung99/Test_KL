import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Menu, Input } from "antd";
import { MenuOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";
import Tools from "../../../Tools/Tools";

import { dataFake } from "../../../services/tree";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Products(props) {
  let match = useRouteMatch();
  const [searchSidebar, setSearchSidebar] = useState("");
  const [menus, setMenus] = useState(dataFake);
  console.log(menus);

  // useEffect(() => {
  //   let results = [];

  //   for (let i = 0; i < menus.children.length; i++) {
  //     const oneChild = menus.filter((item) =>
  //       item.children[i].title.toLowerCase().includes(searchSidebar)
  //     );
  //     results.push(oneChild);
  //   }
  // }, [searchSidebar]);

  //Side bar
  function renderProductList() {
    return (
      Array.isArray(menus) &&
      menus
        .filter((val) => {
          if (searchSidebar === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(searchSidebar.toLowerCase())
          ) {
            return val;
          }
        })
        .map((text) => {
          if (text.subs.length > 0)
            return (
              <SubMenu key={text.id} title={text.title}>
                {Array.isArray(text.subs) &&
                  text.subs.map((item) => {
                    return (
                      <Menu.Item key={item.id} path={item.path}>
                        <Link to={`${match.path}${item.path}`}>
                          {item.title}
                        </Link>
                      </Menu.Item>
                    );
                  })}
              </SubMenu>
            );
          return (
            <Menu.Item key={text.id} path={text.path}>
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
            <p style={{ marginTop: 10, fontSize: 18 }}>Hi Hung</p>
          </div>

          <Input
            type="text"
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined style={{ fontSize: "20px" }} />}
            style={{
              padding: "10px",
              width: "100%",
              border: "none",
              background: "#f9f9f9d9",
              borderRadius: "999px",
              color: "#000",
              height: "auto",
              marginTop: "70px",
            }}
            value={searchSidebar}
            // onPressEnter={onPressEnter}
            onChange={(e) => setSearchSidebar(e.target.value)}
          />

          <Menu mode="inline" style={{ marginTop: "10px" }}>
            {renderProductList()}
          </Menu>
        </Sider>
      </Layout>
      {props.children}
    </>
  );
}

export default Products;
