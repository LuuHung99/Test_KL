import React from "react";
import { Layout, Col } from "antd";
import "./css/hd.css";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;
function HeaderTest(props) {
  // const [nextPage, setNextPage] = useState(true);

  return (
    <Header className="header">
      <Col className="header__block">
        <div className="header__logo">
          <img src="images/logo.png" className="header__img" alt=""/>
        </div>
        <div className="header__name">Học viện nông nghiệp việt nam</div>
        <div className="header__logo">
          <img src="images/logo.png" className="header__img" alt="" />
        </div>

        <Link className="header_menu" to="home">
          <MenuOutlined />
        </Link>
      </Col>
    </Header>
  );
}

export default HeaderTest;
