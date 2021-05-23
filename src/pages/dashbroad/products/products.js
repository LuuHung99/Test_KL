import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Tabs } from "antd";
// import {useHistory } from "react-router-dom";
const { TabPane } = Tabs;

function DetailProducts(props) {
  // const [path, setPath] = useState(dataPath);
  // const history = useHistory();
  const [arrayItem, setArrayItem] = useState([]);
  console.log(arrayItem);
  // console.log(arrayItems);
  const { item } = props;

  if (item !== "") {
    let check = false;
    arrayItem.forEach((x) => {
      if (x.id === item.id) {
        check = true;
      }
    });
    console.log(check);
    if (!check) {
      arrayItem.push(item);
      
    }
  }

  // window.store = arrayItems;

  // const onChange = (activeKey) => {
  //   setActiveKey(activeKey);
  // };

  //  const onEdit = (targetKey, action) => {
  //     this[action](targetKey);
  //   };

  // const [addKey, setAddKey] = useState([]);

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

  // const remove = (activeKey) => {
  //   console.log("key: ", activeKey);
  //   const newArray = [...arrayItem];

  //   const newPanes = newArray.filter((pane) => pane.key !== activeKey);

  //   setArrayItem(newPanes);
  // };

  return (
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
        // onChange={onChange}
        // activeKey={activeKey}
        // onEdit={remove}
        // onEdit={onEdit}
        style={{ margin: "0px 20px" }}
      >
        {arrayItem.length > 0
          ? arrayItem.map((x) => {
              return (
                <TabPane
                  tab={x.title}
                  key={x.id}
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
