import React from "react";
import { Layout } from "antd";
import "./css/header.css";
const { Header } = Layout;

function HeaderTest(props) {
  return (
    <Header className="header">
      <div className="header__block">
        <div className="header__logo">
          <img src="/images/logo.svg" className="header__img" alt="" />
        </div>
        <div className="header__name">Học viện nông nghiệp việt nam</div>
        <div className="header__logo2">
          <img src="/images/logo.svg" className="header__img" alt="" />
        </div>
      </div>
    </Header>
  );
}

export default HeaderTest;
