import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Tabs } from "antd";

import { dataFake } from "../../../services/tree";
import { dataPath } from "../../../services/path";


const { TabPane } = Tabs;


function DetailProducts(props) {
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

    return (
        <Layout
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
      </Layout>
    );
}

export default DetailProducts;