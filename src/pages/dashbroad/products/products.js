import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Tabs } from "antd";
import { dataFake } from "../../../services/tree";
import { useParams, useHistory } from "react-router-dom";
const { TabPane } = Tabs;

const arrayItems = [];

function DetailProducts() {
  const { id } = useParams();
  const history = useHistory();
  const [panes, setPanes] = useState(arrayItems);
  let activeKey = `/${id}`;

  if (researchItem(id) !== undefined) {
    let item = researchItem(id);
    let check = false;
    panes.forEach((i) => {
      if (i.path === "/" + id) check = true;
    });
    if (!check) {
      setPanes([...panes, item]);
    }
  }

  const onChange = (activeKey) => {
    history.push(`/dashbroad${activeKey}`);
  };

  const onEdit = (targetKey, action) => {
    console.log([action], targetKey);
  };

  function researchItem(id) {
    let result = [];
    let item_parent = dataFake.filter((x) => x.path === "/" + id);
    if (item_parent.length === 0) {
      let item = [];
      dataFake.forEach((i) => {
        if (i.subs.length > 0) {
          let check = i.subs.filter((x) => x.path === "/" + id);
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
    <Layout
      className="site-layout"
      style={{
        paddingTop: "90px",
        backgroundColor: "#BDBDBD",
        height: "100vh",
      }}
    >
      <Tabs
        type="editable-card"
        onChange={onChange}
        onEdit={onEdit}
        tabBarGutter="10px"
        style={{ margin: "0px 20px" }}
      >
        {panes.length > 0 ? (
          panes.map((pane) => (
            <TabPane
              tab={pane.title}
              key={pane.path}
              activeKey={activeKey}
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                minHeight: "80vh",
              }}
            >
              {pane.content}
            </TabPane>
          ))
        ) : (
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              width: "100%",
              minHeight: "80vh",
            }}
          ></div>
        )}
      </Tabs>
    </Layout>
  );
}

export default DetailProducts;
