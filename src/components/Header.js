import React from "react";
import { Layout, Col } from "antd";
import "./css/header.css";
const { Header } = Layout;
function HeaderTest(props) {
  return (
    <Header className="header">
      <Col className="header__block">
        <div className="header__logo">
          <img src="images/logo.png" className="header__img" alt="" />
        </div>
        <div className="header__name">Học viện nông nghiệp việt nam</div>
        <div className="header__logo">
          <img src="images/logo.png" className="header__img" alt="" />
        </div>
      </Col>
    </Header>
  );
}

export default HeaderTest;
