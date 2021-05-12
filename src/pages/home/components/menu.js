import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu} from "antd";
import { NavLink} from "react-router-dom";
import './menu.css';
const { Header } = Layout;


function MenuPage(props) {


  return (
    <Header style={{  backgroundColor: 'rgb(117 120 119)'}}  >
      <Menu  mode="horizontal" defaultSelectedKeys={["2"]} style={{backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', padding: '30px 200px', fontSize: '20px'}}>
        <Menu.Item key="/home">
          <NavLink to="/home">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="/about">
          <NavLink to="/about">About</NavLink>
        </Menu.Item>
        <Menu.Item key="/products">
          <NavLink to="/products">Products</NavLink>
        </Menu.Item>
        <Menu.Item key="/blog">
          <NavLink to="/blog">Blog</NavLink>
        </Menu.Item>
        <Menu.Item key="/contact">
          <NavLink to="/contact">Contact</NavLink>
        </Menu.Item>
   
        <Menu.Item ><NavLink to="/">Log out</NavLink></Menu.Item>
        
      </Menu>
    </Header>
  );
}

export default React.memo(MenuPage);
