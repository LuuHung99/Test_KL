import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/sidebar.css";
import Tools from "../../Tools/Tools";
// import Data from "../../api/index";
import { Layout, Menu, Input, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const initData = [
  {
    id: 1,
    names: "Táo",
    titles: [
      {
        id: 1,
        name: "Táo tàu",
        details: [
          {
            id: 1,
            title: "Bước 1",
            items: [
              {
                id: 1,
                text: "Quả việt quất có thể giúp hỗ trợ giảm cân lành mạnh",
              },
              {
                id: 2,
                text:
                  "Thêm bưởi vào chế độ ăn uống của bạn có thể làm giảm nguy cơ kháng insulin, tiền thân của bệnh tiểu đường loại 2",
              },
              {
                id: 3,
                text:
                  "Táo đóng một vai trò trong việc giảm lượng cholesterol cao",
              },
            ],
          },
          {
            id: 2,
            title: "Bước 2",
            items: [
              {
                id: 1,
                text: "Quả việt quất có thể giúp hỗ trợ giảm cân lành mạnh",
              },
              {
                id: 2,
                text:
                  "Thêm bưởi vào chế độ ăn uống của bạn có thể làm giảm nguy cơ kháng insulin, tiền thân của bệnh tiểu đường loại 2",
              },
              {
                id: 3,
                text:
                  "Táo đóng một vai trò trong việc giảm lượng cholesterol cao",
              },
            ],
          },
          {
            id: 3,
            title: "Bước 3",
          },
        ],
      },
      {
        id: 2,
        name: "Táo tây",
      },
    ],
  },
  {
    id: 2,
    names: "Mít",
    titles: [
      {
        id: 3,
        name: "Mít thái",
      },
      {
        id: 4,
        name: "Mít ta",
      },
    ],
  },
  {
    id: 3,
    names: "Xoài",
    titles: [
      {
        id: 5,
        name: "Xoài cát",
      },
      {
        id: 6,
        name: "Xoài thái",
      },
    ],
  },
  {
    id: 4,
    names: "Chuối",
    titles: [
      {
        id: 7,
        name: "Chuối hột",
      },
      {
        id: 8,
        name: "Chuối ta",
      },
    ],
  },
  {
    id: 5,
    names: "Cam",
    titles: [
      {
        id: 9,
        name: "Cam sành",
      },
      {
        id: 10,
        name: "Cam chua",
      },
    ],
  },
];

function Sidebar(props) {
  // const [collapse, setCollapse] = useState(false);
  const [data, setData] = useState(initData);

  function renderProductList() {
    return (
      Array.isArray(data) &&
      data.map((text) => {
        return (
          <SubMenu key={text.id} title={text.names}>
            {Array.isArray(text.titles) &&
              text.titles.map((item) => {
                return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
              })}
          </SubMenu>
        );
      })
    );
  }

  return (
    <Layout>
      <Sider
        style={{
          marginTop: "65px",
          overflow: "auto",
          height: "91vh",
          position: "fixed",
          left: 0,
          backgroundColor: "#fff",
          marginBottom: '30px'
        }}
        className="site-layout-sider-light sidebar-wrapper"
      >
        <div className="logo">
          <img src="images/male-farmer.svg" className="logo__img" />
          <p>Hi Hung</p>
        </div>

        <Input
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
          style={{
            paddingLeft: "5px",
            paddingRight: "5px",
            marginBottom: "10px",
            width: "95%",
          }}
        />
        <Menu theme="light" mode="inline">
          {renderProductList()}
        </Menu>
      </Sider>

    </Layout>
  );
}

export default Sidebar;
