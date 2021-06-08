import React, { useState } from "react";
import { Layout, Col } from "antd";
import "./css/hd.css";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;
function HeaderTest(props) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Header className="headerPd">
      <Col className="header__block">
        <div className="header__logo">
          <img src="images/logo.svg" className="header__img" alt="" />
        </div>
        <div className="header__name">Học viện nông nghiệp việt nam</div>
        <div className="header__logo2">
          <img src="images/logo.svg" className="header__img" alt="" />
        </div>

        <div className="header_menu" >
          {!showMenu ? (
            <MenuOutlined onClick={() => setShowMenu(true)} />
          ) : (
            <CloseOutlined onClick={() => setShowMenu(false)} />
          )}
        </div>
      </Col>
      {showMenu ? (
        <div id="menuToggle">
          <ul id="menu">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </div>
      ) : null}
    </Header>
  );
}

export default HeaderTest;
