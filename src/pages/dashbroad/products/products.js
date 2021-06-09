import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/product.css";
import { Layout, Tabs } from "antd";
import { dataFix } from "../../../services/fixdata";
import { useParams, useHistory } from "react-router-dom";
import TabData from "./tabData";
const { TabPane } = Tabs;

function DetailProducts(props) {
  const { id } = useParams();
  const history = useHistory();
  const [panes, setPanes] = useState([]);
  console.log(panes);
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

  //Call api
  // const [dataProduct, setDataProduct] = useState([]);

  // useEffect(() => {
  //   let res = axios.get("http://localhost:5000/api/root/frontend");
  //   res
  //     .then((response) => {
  //       let r = createCategories(response.data);
  //       setDataProduct(r);
  //       // setSelected(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // function createCategories(categories, parentId = null) {
  //   const categoryList = [];

  //   let category;
  //   if (parentId != null) {
  //     category = categories.filter((cat) => cat.parentId === parentId);
  //   } else {
  //     category = categories.filter((cat) => cat.parentId === "");
  //   }

  //   for (let cate of category) {
  //     categoryList.push({
  //       _id: cate._id,
  //       title: cate.title,
  //       url: cate.url,
  //       parentId: cate.parentId,
  //       description: cate.description,
  //       author: cate.author,
  //       activated: cate.activated,
  //       subs: createCategories(categories, cate._id),
  //     });
  //   }

  //   return categoryList;
  // }

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
                {pane.url === "/tab-data" ? <TabData  /> : null}
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
