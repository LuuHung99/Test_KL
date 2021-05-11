import React, { useState } from "react";
import { Layout, Menu, Row, Col } from "antd";
import "./css/hd.css";
import { MenuOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const { Header } = Layout;
function HeaderTest(props) {
  const [nextPage, setNextPage] = useState(true);


  return (
    <div>
      {nextPage ? <Header className="header">
      <Col className="header__block">
        <div className="header__logo">
          <img src="images/logo.png" className="header__img" />
        </div>
        <div className="header__name">Học viện nông nghiệp việt nam</div>
        <div className="header__logo">
          <img src="images/logo.png" className="header__img" />
        </div>
       
          <Link className="header_menu" >
            <MenuOutlined />
          </Link>
        
      </Col>
    </Header> : <Redirect to="home" />}
    </div>
    
    
  );
}

export default HeaderTest;
