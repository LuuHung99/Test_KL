import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Tabs, Layout } from "antd";

const { TabPane } = Tabs;

function DetailProducts(props) {
  const [arrayItem, setArrayItem] = useState([]);

  const { item } = props;

  if (item !== "") {
    let check = false;
    arrayItem.forEach((x) => {
      if (x.id === item.id) {
        check = true;
      }
    });
    if (!check) {
      arrayItem.push(item);
    }
  }

  // const add = (item) => {
  //   const newTabIndex = 0;

  //   // const { panes } = this.state;
  //   const activeKeys = `newTab${newTabIndex+1}`;
  //   const newPanes = [...panes];
  //   newPanes.push({
  //     ...item,
  //     title: item.title,
  //     content: item.content,
  //     key: activeKeys,
  //   });
  //   setPanes(newPanes);
  //   // setActiveKey(activeKeys);

  //   // this.setState({
  //   //   panes: newPanes,
  //   //   activeKey,
  //   // });
  // };

  const remove = (activeKey) => {
    console.log("key: ", activeKey);
    const newArray = [...arrayItem];

    const newPanes = newArray.filter((pane) => pane.key !== activeKey);

    setArrayItem(newPanes);
  };

  const changeTabs = (key) => {
    console.log("key: ", key);
  };

  return (
    //
    <Layout
      className="site-layout"
      style={{
        paddingTop: "90px",
        backgroundColor: "#BDBDBD",
      }}
    >
      <Tabs
        type="editable-card"
        tabBarGutter="10px"
        activeKey={item.key}
        onChange={changeTabs}
        onEdit={remove}
        style={{ margin: "0px 20px" }}
      >
        {arrayItem.length > 0
          ? arrayItem.map((x) => {
              return (
                <TabPane
                  tab={x.title}
                  key={x.key}
                  closable={x.closable}
                  style={{ backgroundColor: "#fff", padding: "30px" }}
                >
                  {x.content}
                </TabPane>
              );
            })
          : null}
      </Tabs>
    </Layout>
  );
}

export default DetailProducts;
