import React, { useState } from "react";
import { Layout, Col } from "antd";
import "./css/hd.css";
import {
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;
function HeaderTest(props) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Header className="headerPd">
      <Col className="header__block">
        <div className="header__logo">
          <img src="/images/logo.svg" className="header__img" alt="" />
        </div>
        <div className="header__name">Học viện nông nghiệp việt nam</div>
        <div className="header__logo2">
          <img src="/images/logo.svg" className="header__img" alt="" />
        </div>

        <div className="header_menu">
          {!showMenu ? (
            <MenuOutlined onClick={() => setShowMenu(true)} />
          ) : (
            <CloseOutlined onClick={() => setShowMenu(false)} />
          )}
        </div>
      </Col>
      {showMenu ? (
        <div id="menuToggle">
          <ul className="menu">
            <div className="menu-logo">
              <img
                src="/images/avatar-1.jpg"
                alt=""
                style={{ width: 40, height: 40, borderRadius: '50%' }}
              />
              <p>Hung Luu</p>
            </div>
            <div style={{backgroundColor: "white"}}>
            <li className="profile_menu">
              <div>
                <UserOutlined />
              </div>
              <div>Profile</div>
            </li>
            <li className="profile_menu">
              <div>
                <LogoutOutlined />
              </div>
              <Link to="/">Logout</Link>
            </li>
            </div>
            
          </ul>
        </div>
      ) : null}
    </Header>
  );
}

export default HeaderTest;
