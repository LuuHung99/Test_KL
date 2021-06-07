import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/product.css";
import { Layout, Tabs, Table, Tag, Space } from "antd";
import { dataFake } from "../../../services/tree";
import { useParams, useHistory } from "react-router-dom";
const { TabPane } = Tabs;

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "Tags",
//     key: "tags",
//     dataIndex: "tags",
//     render: (tags) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? "geekblue" : "green";
//           if (tag === "loser") {
//             color = "volcano";
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (text, record) => (
//       <Space size="middle">
//         <a>Invite {record.name}</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

function DetailProducts(props) {
  const { id } = useParams();
  const history = useHistory();
  const [panes, setPanes] = useState([]);

  let item = researchItem(id);

  if (researchItem(id) !== undefined) {
    let check = false;
    panes.forEach((i) => {
      if (i.path === "/" + id) check = true;
    });
    if (!check) {
      setPanes([...panes, item]);
    }
  }

  const remove = (activeKey) => {
    console.log("key: ", activeKey);
    const newPanes = panes.filter((pane) => pane.path !== activeKey);
    setPanes(newPanes);
  };

  const onChange = (activeKey) => {
    history.push(`/dashbroad/${activeKey}`);
  };

  //Call api
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    let res = axios.get("http://localhost:5000/api/root/frontend");
    res
      .then((response) => {
        let r = createCategories(response.data);
        setDataProduct(r);
        // setSelected(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function createCategories(categories, parentId = null) {
    const categoryList = [];

    let category;
    if (parentId != null) {
      category = categories.filter((cat) => cat.parentId === parentId);
    } else {
      category = categories.filter((cat) => cat.parentId === "");
    }

    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        title: cate.title,
        url: cate.url,
        parentId: cate.parentId,
        description: cate.description,
        author: cate.author,
        activated: cate.activated,
        subs: createCategories(categories, cate._id),
      });
    }

    return categoryList;
  }

  function researchItem(id) {
    let result = [];
    
    let item_parent = dataProduct.filter((x) => x.path === "/" + id);
    if (item_parent.length === 0) {
      let item = [];

      dataProduct.forEach((i) => {
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
    //
    <Layout
      className="site-layout"
      style={{
        paddingTop: "90px",
        backgroundColor: "#BDBDBD",
        height: "100vh",
      }}
    >
      {panes.length > 0 ? (
        <Tabs
          type="editable-card"
          onChange={onChange}
          onEdit={remove}
          tabBarGutter="10px"
          activeKey={item.url}
          style={{ margin: "0px 20px" }}
        >
          {panes.map((pane) => (
            <TabPane
              tab={pane.title}
              key={pane.url}
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                minHeight: "80vh",
              }}
            >
              {pane.content}
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
