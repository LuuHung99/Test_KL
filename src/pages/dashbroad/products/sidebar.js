import React, { useState } from "react";
import "./css/product.css";
import { Layout, Menu, Input } from "antd";
import { MenuOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Products(props) {
  let match = useRouteMatch();
  const [searchSidebar, setSearchSidebar] = useState("");
  //Call api
  const [data] = useState(window.store.products);
  console.log(data);
  //Side bar
  function renderProductList() {
    return (
      data  
        // eslint-disable-next-line array-callback-return
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
                {
                  text.subs.map((item) => {
                    if (item.activated === true)
                      return (
                        <Menu.Item key={item.id} path={item.url}>
                          <Link to={`${match.url}/${item.url}`}>
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
              <Menu.Item key={text.id} path={text.url}>
                <Link to={`${match.url}/${text.url}`}>{text.title}</Link>
              </Menu.Item>
            );
          }
          return null;
        })
    );
  }
  return (
    <>
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
          <Input
            type="text"
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined style={{ fontSize: "20px" }} />}
            className="search_sidebar"
            value={searchSidebar}
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
