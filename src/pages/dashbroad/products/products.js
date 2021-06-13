import React, { useState } from "react";
import "./css/product.css";
import { Layout, Tabs } from "antd";
import { useParams, useHistory } from "react-router-dom";
import TabData from "./tabData";
import { dataFix } from "../../../services/fixdata";

const { TabPane } = Tabs;

function DetailProducts(props) {
  const { id } = useParams();
  const history = useHistory();
  const [panes, setPanes] = useState([]);
  let item = researchItem(id);

  if (researchItem(id) !== undefined) {
    let check = false;
    panes.forEach((i) => {
      if (i.url === "/" + id) check = true;
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
    history.push(`/dashbroad${activeKey}`);
  };

  function researchItem(id) {
    let result = [];
    let item_parent = dataFix.filter((x) => x.url === "/" + id);
    if (item_parent.length === 0) {
      let item = [];

      dataFix.forEach((i) => {
        if (i.subs.length > 0) {
          let check = i.subs.filter((x) => x.url === "/" + id);
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
          {panes.map((pane) => (
            <TabPane
              tab={pane.title}
              key={pane.url}
              style={{
                backgroundColor: "#fff",
              }}
            >
              <div className="content_product">
                {pane.url === "/tab-data" ? <TabData /> : null}
                {pane.description}
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
