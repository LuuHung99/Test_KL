import React, { useState, Suspense, lazy, useEffect } from "react";
import "./css/product.css";
import { Layout, Tabs } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/actions/loading";
import { useSelector } from "react-redux";

const TabData = lazy(() => import("./Frontend/index"));
const Role = lazy(() => import("./Role/index"));
const User = lazy(() => import("./User/index"));
const Resource = lazy(() => import("./Backend/index"));

const { TabPane } = Tabs;

function DetailProducts(props) {
  const { id } = useParams();
  const history = useHistory();
  const [panes, setPanes] = useState([]);
  const [activekey, setActiveKey] = useState();

  useEffect(() => {
    if (panes.length > 0) {
      setActiveKey(panes[0].url);
    }
  }, [panes]);

  const user = useSelector((state) => state.auth.user);

  let item = researchItem(id);

  console.log("item", item);

  if (item !== undefined) {
    let check = false;
    panes.forEach((i) => {
      if (i.url === id) check = true;
    });
    if (!check) {
      setPanes([...panes, item]);
    }
  }

  const remove = (targetKey) => {
    // const newPanes = panes.filter((pane) => pane.url !== targetKey);
    // setPanes(newPanes);
    // const tabs = window.sessionStorage.getItem("tabs");
    // const data = JSON.parse(tabs).data;
    // console.log("data", d);
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.url === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newpanes = panes.filter((pane) => pane.url !== targetKey);

    if (newpanes.length && activekey === targetKey) {
      if (lastIndex >= 0) {
        activekey = newpanes[lastIndex].url;
      } else {
        activekey = newpanes[0].url;
      }
    }
    setPanes(newpanes);
    setActiveKey(activekey);
  };

  const onChange = (activeKey) => {
    history.push(`/dashboard/${activeKey}`);
  };

  function researchItem(id) {
    let result = [];
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
              {user.username && (
                <div className="content_product">
                  {pane.url === "tab" ? (
                    <Suspense>
                      <TabData />
                    </Suspense>
                  ) : null}
                  {pane.url === "role" ? (
                    <Suspense>
                      <Role />
                    </Suspense>
                  ) : null}
                  {pane.url === "user" ? (
                    <Suspense>
                      <User />
                    </Suspense>
                  ) : null}
                  {pane.url === "resource" ? (
                    <Suspense>
                      <Resource />
                    </Suspense>
                  ) : null}
                  <Suspense>{pane.description}</Suspense>
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

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { showLoading, hideLoading })(
  DetailProducts
);
