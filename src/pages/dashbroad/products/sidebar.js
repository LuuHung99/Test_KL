import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/product.css";
import { Layout, Menu, Input } from "antd";
import { MenuOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useRouteMatch } from "react-router-dom";

// import { dataFake } from "../../../services/tree";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Products(props) {
  let match = useRouteMatch();
  const [searchSidebar, setSearchSidebar] = useState("");
  // const [menus, setMenus] = useState(dataFake);

  //Call api 
  const [data, setData] = useState([]);
    useEffect(() => {
      let res = axios.get("http://localhost:5000/api/root/frontend");
      res
        .then((response) => {
          let r = createCategories(response.data);
          setData(r);
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

  //Side bar
  function renderProductList() {
    return (
      Array.isArray(data) &&
      data
        .filter((val) => {
          if (searchSidebar === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(searchSidebar.toLowerCase())
          ) {
            return val;
          }
        })
        .map((text) => {
          if (text.subs.length > 0)
            return (
              <SubMenu key={text.id} title={text.title}>
                {Array.isArray(text.subs) &&
                  text.subs.map((item) => {
                    return (
                      <Menu.Item key={item.id} path={item.url}>
                        <Link to={`${match.url}/${item.url}`}>
                          {item.title}
                        </Link>
                      </Menu.Item>
                    );
                  })}
              </SubMenu>
            );
          return (
            <Menu.Item key={text.id} path={text.url}>
              <Link to={`${match.url}/${text.url}`}>{text.title}</Link>
            </Menu.Item>
          );
        })
    );
  }

  return (
    <>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <MenuOutlined id="icon1" />
        <CloseOutlined id="icon2" />
      </label>

      <Layout id="sidebar-wrapper">
        <Sider className="sidebar_container">
          <div className="logo">
            <img src="images/male-farmer.svg" className="logo__img" alt="" />
            <p style={{ marginTop: 10, fontSize: 18 }}>Hi Hung</p>
          </div>

          <Input
            type="text"
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined style={{ fontSize: "20px" }} />}
            style={{
              padding: "10px",
              width: "100%",
              border: "none",
              background: "#f9f9f9d9",
              borderRadius: "999px",
              color: "#000",
              height: "auto",
              marginTop: "70px",
            }}
            value={searchSidebar}
            onChange={(e) => setSearchSidebar(e.target.value)}
          />
          <Menu mode="inline" style={{ marginTop: "10px" }}>
            {renderProductList()}
          </Menu>
        </Sider>
      </Layout>
      {props.children}
    </>
  );
}

export default Products;
