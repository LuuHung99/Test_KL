import React, { useState } from "react";
import "./css/product.css";
import { Layout, Tabs } from "antd";
import { useParams, useHistory } from "react-router-dom";
import TabData from "./tabData";
import Role from "./role";
import User from "./user";
import Resource from "./resource";

const { TabPane } = Tabs;

function DetailProducts(props) {
  const { id } = useParams();
  const history = useHistory();
  const [panes, setPanes] = useState([]);
  let item = researchItem(id);

  if (researchItem(id) !== undefined) {
    let check = false;
    panes.forEach((i) => {
      if (i.url === id) check = true;
    });
    if (!check) {
      setPanes([...panes, item]);
    }
  }

  const remove = (activeKey) => {
    console.log("key: ", activeKey);
    const newPanes = panes.filter((pane) => pane.url !== activeKey);
    setPanes(newPanes);
  };

  const onChange = (activeKey) => {
    history.push(`/dashbroad/${activeKey}`);
  };

  function researchItem(id) {
    let result = [];
    const data = window.store.products;
    let item_parent = data.filter((x) => x.url === id);
    if (item_parent.length === 0) {
      let item = [];
      data.forEach((i) => {
        if (i.subs.length > 0) {
          let check = i.subs.filter((x) => x.url === id);
          if (check.length > 0) item = check;
        }
      });
      result = item;
    } else {
      result = item_parent;
    }
    return result[0];
  }

  return (
    <Layout className="site-layout">
      {panes.length > 0 ? (
        <Tabs
          type="editable-card"
          onChange={onChange}
          onEdit={remove}
          tabBarGutter="10px"
          activeKey={item.url}
          style={{ margin: "0px 15px" }}
        >
          {panes.map((pane, index) => (
            <TabPane
              tab={pane.title}
              key={pane.url}
              style={{
                backgroundColor: "#fff",
              }}
            >
              <div className="content_product" >
                {pane.url === "front-end" ? <TabData /> : null}
                {pane.description}
                {pane.url === "role" ? <Role /> : null}
                {pane.url === "user" ? <User /> : null}
                {pane.url === "resource" ? <Resource /> : null}
              </div>
            </TabPane>
          ))}
        </Tabs>
      ) : (
        <div>Link active false</div>
      )}
    </Layout>
  );
}

export default DetailProducts;
