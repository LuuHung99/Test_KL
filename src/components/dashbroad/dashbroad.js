import React, {useState} from "react";
import "antd/dist/antd.css";
import './css/dashbroad.css';
import { Layout, Menu, Input } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  SearchOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;


function Dashbroad(props) {
    const [collapse, setCollapse] = useState(true);
    const [showIcon, setShowIcon] = useState(true);
    const toggle = () => {
        setCollapse(false);
        setShowIcon(false);
    }
    const handleChane = () => {
        setCollapse(true);
        setShowIcon(true);
        // console.log('dfsfd');
    }
  return (
    <Layout>
        {collapse ? (<Sider 
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          backgroundColor: '#fff',
        }}
      >
        <div className="logo" >
            <img src="images/male-farmer.svg" className="logo__img" /> <text>Hi Hung</text>
        </div>
        
        <Input
        placeholder="Tìm kiếm"
        // onChange={searchCategory}
        prefix={<SearchOutlined />}
        style={{
          paddingLeft: "5px",
          paddingRight: "5px",
          marginBottom: "10px",
          width: '95%'
        }}
      />
        <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]} style={{paddingTop: '10px'}}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            nav 4
          </Menu.Item>
          <Menu.Item key="5" icon={<CloudOutlined />}>
            nav 5
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            nav 6
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            nav 7
          </Menu.Item>
          <Menu.Item key="8" icon={<ShopOutlined />}>
            nav 8
          </Menu.Item>
          <Menu.Item key="9" icon={<TeamOutlined />}>
            nav 9
          </Menu.Item>
          <Menu.Item key="10" icon={<ShopOutlined />}>
            nav 10
          </Menu.Item>
          <Menu.Item key="11" icon={<TeamOutlined />}>
            nav 11
          </Menu.Item>
          <Menu.Item key="12" icon={<ShopOutlined />}>
            nav 12
          </Menu.Item>
          <Menu.Item key="13" icon={<TeamOutlined />}>
            nav 13
          </Menu.Item>
          <Menu.Item key="14" icon={<ShopOutlined />}>
            nav 14
          </Menu.Item>
          <Menu.Item key="15" icon={<TeamOutlined />}>
            nav 15
          </Menu.Item>
          <Menu.Item key="16" icon={<ShopOutlined />}>
            nav 16
          </Menu.Item>
        </Menu>
        
      </Sider>) : ( <MenuUnfoldOutlined className="showicon"  onClick={handleChane} />)}
      {showIcon ? (<div className="hideicon">
            <MenuFoldOutlined onClick={toggle}/>
        </div> ) : ('')}
      
    </Layout>
  );
}

export default Dashbroad;
