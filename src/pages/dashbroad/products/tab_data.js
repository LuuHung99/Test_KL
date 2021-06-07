import React from "react";
import {Layout} from "antd";
function TabData(props) {
  const { data } = props;
  console.log("data", data);
  return (
    <Layout
      className="site-layout"
      style={{
        paddingTop: "70px",
        paddingLeft: " 30px",
        backgroundColor: "#fff",
        height: "100vh",
      }}
    >
      <h1>Hello dsfsd</h1>
      {/* {!onChangePage ?  <h1>hello</h1> : null} */}
     

    </Layout>
  );
}

export default TabData;
