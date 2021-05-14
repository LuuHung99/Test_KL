import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
function FooterTest(props) {
  return (
    <Footer style={{ textAlign: "center", fontSize: "20px", backgroundColor: '#848484', color: '#fff', paddingLeft: '300px'}}>
      Ant Design ©2021 Created by LH Dev
    </Footer>
  );
}

export default FooterTest;
