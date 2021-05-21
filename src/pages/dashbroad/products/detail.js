import React from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Tabs } from "antd";
import {Link} from "react-router-dom";

const { TabPane } = Tabs;

function DetailProducts(props) {
  // const [path, setPath] = useState(dataPath);

  const { item } = props;
  console.log("Props Detail", item);

  // const onChange = (activeKey) => {
  //   setActiveKey(activeKey);
  // };

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

  // const remove = (targetKey) => {
  //   console.log("key: ", targetKey);

  //   const newPanes = path.filter((pane) => pane.key !== targetKey);

  //   setPath(newPanes);
  // };

  

  return (
    <Layout
      className="site-layout"
      style={{
        paddingTop: "90px",
        backgroundColor: "#BDBDBD",
      }}
    >
      
      <Tabs
        type="editable-card"
        tabBarGutter="15px"
      
        // onChange={onChange}
        // activeKey={activeKey}
        // onEdit={remove}
        // onEdit={onEdit}
        
        style={{ margin: "0px 20px", marginTop: "20px" }}
      >
        {item.menu
          ? item.menu.map((e) => (
              <TabPane
                tab={e.title}
                key={e.key}
                closable={e.closable}
                style={{ backgroundColor: "#fff", padding: "30px" }}
                
              >
                {e.content}
              </TabPane>
            ))
          : null}
      </Tabs>
    </Layout>
  );
}

export default DetailProducts;
