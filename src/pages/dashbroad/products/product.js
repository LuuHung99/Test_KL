import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Menu, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import DetailProducts from "./detail";

import { dataFake } from "../../../services/tree";
import { dataPath } from "../../../services/path";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Products(props) {
  const [searchSidebar, setSearchSidebar] = useState("");

  // const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [menus, setMenus] = useState(dataFake);
  const [path, setPath] = useState(dataPath);

  // const onChange = (activeKey) => {
  //   setActiveKey(activeKey);
  // };

  //  const onEdit = (targetKey, action) => {
  //     this[action](targetKey);
  //   };

  // const add = () => {
  //   const newTabIndex = 0;

  //   // const { panes } = this.state;
  //   const activeKeys = `newTab${newTabIndex+1}`;
  //   const newPanes = [...panes];
  //   newPanes.push({
  //     title: "New Tab",
  //     content: "Content of new Tab",
  //     key: activeKeys,
  //   });
  //   setPanes(newPanes);
  //   // setActiveKey(activeKeys);

  //   // this.setState({
  //   //   panes: newPanes,
  //   //   activeKey,
  //   // });
  // };

  const remove = (targetKey) => {
    console.log("key: ", targetKey);

    const newPanes = menus.filter((pane) => pane.key !== targetKey);

    setMenus(newPanes);
  };

  const handleProductOnClick = (item) => {
    console.log("products", item);
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
                      <Link to={`${item.path}/${item.id}`}>{item.title}</Link>
                    </Menu.Item>
                  );
                })}
            </SubMenu>
            
          );
        return (
          <Menu.Item key={text.id} onClick={() => handleProductOnClick(text)}>
            <Link to={`${text.path}/${text.id}`}>{text.title}</Link>
          </Menu.Item>
        );
      })
    );
  }


  //Search Sidebar
  // const onchangeSearchSidebar = (value) => {
  //   console.log("Nhap gia tri", value);
  //   setSearchSidebar("");
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(event);
  // };

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

      {/* <DetailProducts /> */}

      {/* Content */}
      {/* <Layout
        className="site-layout"
        style={{
          // marginLeft: 200,
          paddingTop: "90px",
          backgroundColor: "#BDBDBD",
        }}
      >
        <Tabs
          type="editable-card"
          // onChange={onChange}
          // activeKey={activeKey}
          onEdit={remove}
          // onEdit={onEdit}
          style={{ margin: "0px 20px", marginTop: "20px" }}
        >
          {path.map((menu) => (
            <TabPane
              tab={menu.title}
              key={menu.key}
              closable={menu.closable}
              style={{ backgroundColor: "#fff", padding: "30px" }}
            >
              {menu.content}
            </TabPane>
          ))}
        </Tabs>
      </Layout> */}
    </>
  );
}

export default Products;
