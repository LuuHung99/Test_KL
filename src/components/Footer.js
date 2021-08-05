import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
function FooterTest(props) {
  return (
    <Footer style={{ textAlign: "center", fontSize: "20px", backgroundColor: '#20232a', color: '#fff'  }}>
      Ant Design ©2021 Created by LH Dev
    </Footer>
  );
}

export default FooterTest;
