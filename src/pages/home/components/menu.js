import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { NavLink} from "react-router-dom";
const { Header, Content, Footer } = Layout;

function MenuPage(props) {


  return (
    <Header style={{  backgroundColor: 'rgb(117 120 119)'}}  >
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} style={{backgroundColor: 'rgb(117 120 119)', display: 'flex', justifyContent: 'space-around', margin: '0px 250px'}}>
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
