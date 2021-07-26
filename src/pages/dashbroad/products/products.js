import React, { useState, Suspense, lazy } from "react";
import "./css/product.css";
import { Layout, Tabs } from "antd";
import { useParams, useHistory } from "react-router-dom";
// import TabData from "./Frontend/index";
// import Role from "./Role/index";
// import User from "./User/index";
// import Resource from "./Backend/index";

const TabData = lazy(() => import("./Frontend/index"));
const Role = lazy(() => import("./Role/index"));
const User = lazy(() => import("./User/index"));
const Resource = lazy(() => import("./Backend/index"));

const { TabPane } = Tabs;

function DetailProducts(props) {
  const { id } = useParams();
  const history = useHistory();
  const [panes, setPanes] = useState([]);

  const tokenUser = JSON.parse(window.localStorage.user);

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

  const remove = (targetKey) => {
    const newPanes = panes.filter((pane) => pane.url !== targetKey);

    setPanes(newPanes);
  };

  const onChange = (activeKey) => {
    console.log(activeKey);
    history.push(`/dashboard/${activeKey}`);
  };

  function researchItem(id) {
    let result = [];
    // const data = window.store.products;
    const tabs = window.sessionStorage.getItem("tabs");
    const data = JSON.parse(tabs).data;
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
      {panes ? (
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
              {tokenUser.username && (
                <div className="content_product">
                  {pane.url === "tab" ? (
                    <Suspense fallback={<h1>Loading...</h1>}>
                      <TabData />
                    </Suspense>
                  ) : null}
                  {pane.description}
                  {pane.url === "role" ? (
                    <Suspense fallback={<h1>Loading...</h1>}>
                      <Role />
                    </Suspense>
                  ) : null}
                  {pane.url === "user" ? (
                    <Suspense fallback={<h1>Loading...</h1>}>
                      <User />
                    </Suspense>
                  ) : null}
                  {pane.url === "resource" ? (
                    <Suspense fallback={<h1>Loading...</h1>}>
                      <Resource />
                    </Suspense>
                  ) : null}
                </div>
              )}
            </TabPane>
          ))}
        </Tabs>
      ) : (
        <h1>Data Failed Error</h1>
      )}
    </Layout>
  );
}

export default DetailProducts;
