import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
function FooterTest(props) {
  return (
    <Footer style={{ textAlign: "center", fontSize: "20px", backgroundColor: '#20232a', color: '#fff', position: "absolute", bottom: 0, width: "100%"  }}>
      Ant Design ©2021 Created by LH Dev
    </Footer>
  );
}

export default FooterTest;
