import React, { useState, Suspense, lazy } from "react";
import "./css/product.css";
import { Layout, Tabs } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../../redux/actions/loading";
import { getTabSession } from "../../../redux/actions/product.action";

const TabData = lazy(() => import("./Frontend/index"));
const Role = lazy(() => import("./Role/index"));
const User = lazy(() => import("./User/index"));
const Resource = lazy(() => import("./Backend/index"));

const { TabPane } = Tabs;

function DetailProducts(props) {
  const { id } = useParams();
  const history = useHistory();

  const user = useSelector((state) => state.auth.user);
  const historyTab = useSelector((state) => state.products.historyTab);

  const [panes, setPanes] = useState(historyTab);

  const dispatch = useDispatch();

  let item = researchItem(id);
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
    const newPanes = panes.filter((item) => item.url !== targetKey);
    setPanes(newPanes);
    window.sessionStorage.setItem("tabs", JSON.stringify({ data: newPanes }));
    const listUrl = panes.map((item) => item.url);
    const indexRemove = listUrl.indexOf(targetKey);
    const indexCurrent = listUrl.indexOf(id);
    let newUrl;
    if (panes.length - 1 > 0) {
      if (
        (indexCurrent < indexRemove && indexRemove <= panes.length - 1) ||
        (indexRemove >= 0 && indexRemove < indexCurrent)
      ) {
        newUrl = listUrl[indexCurrent];
      } else if (indexRemove < panes.length - 1) {
        newUrl = listUrl[indexRemove + 1];
      } else {
        newUrl = listUrl[indexRemove - 1];
      }
      history.push(`/dashboard/${newUrl}`);
    } else {
      setPanes([]);
      history.push(`/dashboard`);
    }
    dispatch(getTabSession());
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
          activeKey={id}
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
