import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import './css/header.css';
const { Header } = Layout;
function HeaderTest(props) {
  return (
    <Layout>
      <Header className="header">
          <Col  className="header__block"  >
            <div className="header__logo">
              <img src="images/logo.png" className="header__img" />
            </div>
            <div className="header__name">Học viện nông nghiệp việt nam</div>
            <div className="header__logo">
              <img src="images/logo.png" className="header__img" />
            </div>
          </Col>
      </Header>
    </Layout>
  );
}

export default HeaderTest;
