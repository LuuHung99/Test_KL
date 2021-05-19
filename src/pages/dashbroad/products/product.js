import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Menu, Input, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

import { dataFake } from "../../../services/tree";

const { Sider } = Layout;
const { SubMenu } = Menu;

const { TabPane } = Tabs;

const initialPanes = [
  {
    title: "Tab 1",
    content:
      "Reprehenderit tristique sociosqu, fames fugit eaque modi viverra quisquam sit necessitatibus? Nec quas sit lacinia minus doloremque eaque! Volutpat occaecati ea, dignissim porro quo. Molestie est alias, magni, tempora, fuga, turpis exercitation condimentum hendrerit erat doloribus, nam dolore, tincidunt senectus, iste aperiam adipisicing voluptas nec viverra sed maiores. Reprehenderit nostrud. Consequatur ut amet sapien, perferendis culpa. Semper vulputate placerat nobis nostrum mauris occaecati quod auctor cumque distinctio hic mus sodales, massa conubia, optio, fugiat aut deleniti harum veniam dictumst architecto deleniti, faucibus pulvinar distinctio imperdiet dolores quisque arcu dolorum velit per magni adipisicing molestiae aliqua dolore, placerat magnam! Beatae auctor, Reprehenderit tristique sociosqu, fames fugit eaque modi viverra quisquam sit necessitatibus? Nec quas sit lacinia minus doloremque eaque! Volutpat occaecati ea, dignissim porro quo. Molestie est alias, magni, tempora, fuga, turpis exercitation condimentum hendrerit erat doloribus, nam dolore, tincidunt senectus, iste aperiam adipisicing voluptas nec viverra sed maiores. Reprehenderit nostrud. Consequatur ut amet sapien, perferendis culpa. Semper vulputate placerat nobis nostrum mauris occaecati quod auctor cumque distinctio hic mus sodales, massa conubia, optio, fugiat aut deleniti harum veniam dictumst architecto deleniti, faucibus pulvinar distinctio imperdiet dolores quisque arcu dolorum velit per magni adipisicing molestiae aliqua dolore, placerat magnam! Beatae auctor,Reprehenderit tristique sociosqu, fames fugit eaque modi viverra quisquam sit necessitatibus? Nec quas sit lacinia minus doloremque eaque! Volutpat occaecati ea, dignissim porro quo. Molestie est alias, magni, tempora, fuga, turpis exercitation condimentum hendrerit erat doloribus, nam dolore, tincidunt senectus, iste aperiam adipisicing voluptas nec viverra sed maiores. Reprehenderit nostrud. Consequatur ut amet sapien, perferendis culpa. Semper vulputate placerat nobis nostrum mauris occaecati quod auctor cumque distinctio hic mus sodales, massa conubia, optio, fugiat aut deleniti harum veniam dictumst architecto deleniti, faucibus pulvinar distinctio imperdiet dolores quisque arcu dolorum velit per magni adipisicing molestiae aliqua dolore, placerat magnam! Beatae auctorReprehenderit tristique sociosqu, fames fugit eaque modi viverra quisquam sit necessitatibus? Nec quas sit lacinia minus doloremque eaque! Volutpat occaecati ea, dignissim porroadipisicing molestiae aliqua dolore, placerat magnam! Beatae auctor, Reprehenderit tristique sociosqu, fames fugit eaque modi viverra quisquam sit necessitatibus? Nec quas sit lacinia minus doloremque eaque! Volutpat occaecati ea, dignissim porro quo. Molestie est alias, magni, tempora, fuga, turpis exercitation condimentum hendrerit erat doloribus, nam dolore, tincidunt senectus, iste aperiam adipisicing voluptas nec viverra sed maiores. Reprehenderit nostrud. Consequatur ut amet sapien, perferendis culpa. Semper vulputate placerat nobis nostrum mauris occaecati quod auctor cumque distinctio hic mus sodales, massa conubia, optio, fugiat aut deleniti harum veniam dictumst architecto deleniti, faucibus pulvinar distinctio imperdiet dolores quisque arcu dolorum velit per magni adipisicing molestiae aliqua dolore, placerat magnam! Beatae auctor,Reprehenderit tristique sociosqu, fames fugit eaque modi viverra quisquam sit necessitatibus? Nec quas sit lacinia minus doloremque eaque! Volutpat occaecati ea, dignissim porro quo. Molestie est alias, magni, tempora, fuga, turpis exercitation condimentum hendrerit erat doloribus, nam dolore, tincidunt senectus, iste aperiam adipisicing voluptas nec viverra sed maiores. Reprehenderit nostrud. Consequatur ut amet sapien, perferendis culpa. Semper vulputate placerat nobis nostrum mauris occaecati quod auctor cumque distinctio hic mus sodales, massa conubia, optio, fugiat aut deleniti harum veniam dictumst architecto deleniti, faucibus pulvinar distinctio imperdiet dolores quisque arcu dolorum velit per magni adipisicing molestiae aliqua dolore, placerat magnam! Beatae auctorReprehenderit tristique sociosqu, fames fugit eaque modi viverra quisquam sit necessitatibus? Nec quas sit lacinia minus doloremque eaque! Volutpat occaecati ea, dignissim porro  ",
    key: "1",
  },

  {
    title: "Tab 2",
    content:
      "Trồng cây xanh trong vườn đã khó còn chăm sóc và gìn giữ chúng tươi mới còn khó khăn hơn. Chắc chắn rằng nếu bạn không chăm sóc đúng đắn thì cây sẽ chết, làm mất đi vẻ đẹp của khu vườn. Vậy chăm sóc cây xanh trong vườn như thế nào đúng cách nhất. Hôm nay Vinafarm chia sẻ đến tất cả mọi người cách chăm sóc cây xanh trong vườn luôn tươi tốt. Để chăm sóc cây cảnh luôn tươi tốt yếu tố đầu tiên bạn cần lưu ý là ánh sáng. Tuy nhiên mỗi cây sẽ có lượng ánh sáng khác nhau. Có những loại cây cảnh chịu được những ánh sáng thấp, nhưng cũng có những một số cây cảnh chỉ cần ánh sáng tự nhiên mới phát triển được.",
    key: "2",
  },

  {
    title: "Tab 3",
    content: "Content of Tab 3",
    key: "3",
  },
];

function Products(props) {
  const [data, setData] = useState(dataFake);

  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [panes, setPanes] = useState(initialPanes);

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  //  const onEdit = (targetKey, action) => {
  //     this[action](targetKey);
  //   };

  // const add = () => {
  //   const newTabIndex = 0;

  //   // const { panes } = this.state;
  //   const activeKeys = `newTab${newTabIndex+1}`;
  //   const newPanes = [...panes];
  //   newPanes.push({
  //     title: "New Tab",
  //     content: "Content of new Tab",
  //     key: activeKeys,
  //   });
  //   setPanes(newPanes);
  //   // setActiveKey(activeKeys);

  //   // this.setState({
  //   //   panes: newPanes,
  //   //   activeKey,
  //   // });
  // };

  const remove = (targetKey) => {
    console.log("key: ", targetKey);

    const newPanes = panes.filter((pane) => pane.key !== targetKey);

    setPanes(newPanes);
  };

  //Side bar
  function renderProductList() {
    return (
      Array.isArray(data) &&
      data.map((text) => {
        if (text.subs.length > 0)
          return (
            <SubMenu key={text.id} title={text.title}>
              {Array.isArray(text.subs) &&
                text.subs.map((item) => {
                  return (
                    <Menu.Item
                      key={item.id}
                      onClick={() => {
                        console.log(item.path);
                      }}
                    >
                      {item.title}
                    </Menu.Item>
                  );
                })}
            </SubMenu>
          );
        return (
          <Menu.Item
            key={text.id}
            onClick={() => {
              console.log(text.path);
            }}
          >
            {text.title}
          </Menu.Item>
        );
      })
    );
  }

  return (
    <>
      {/* Sidebar */}

      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <MenuOutlined id="icon1" />
        <CloseOutlined id="icon2" />
      </label>

      <Layout id="sidebar-wrapper">
        <Sider className="sidebar_container">
          <div className="logo">
            <img src="images/male-farmer.svg" className="logo__img" alt="" />
            <p>Hi Hung</p>
          </div>
          <Input
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined />}
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              marginBottom: "10px",
              width: "95%",
            }}
          />
          <Menu mode="inline">{renderProductList()}</Menu>
        </Sider>
      </Layout>

      {/* Content */}
      <Layout
        className="site-layout"
        style={{
          // marginLeft: 200,
          paddingTop: "90px",
          backgroundColor: "#BDBDBD",
        }}
      >
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={remove}
          // onEdit={onEdit}
          style={{ margin: "0px 20px", marginTop: "20px" }}
        >
          {panes.map((pane) => (
            <TabPane
              tab={pane.title}
              key={pane.key}
              closable={pane.closable}
              style={{ backgroundColor: "#fff", padding: "30px" }}
            >
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </Layout>
    </>
  );
}

export default Products;
