import React, { useState } from "react";
import "antd/dist/antd.css";
import "./css/product.css";
import { Layout, Menu, Input, Button } from "antd";

const { Header, Content, Footer, Sider } = Layout;

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
        details: [
          {
            id: 1,
            title: "Bước 4",
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
            title: "Bước 6",
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
            title: "Bước 5",
          },
          
          {
            id: 5,
            title: "Bước 5",
          },
          {
            id: 6,
            title: "Bước 5",
          },
          {
            id: 7,
            title: "Bước 5",
          },
          {
            id: 7,
            title: "Bước 5",
          },
          {
            id: 7,
            title: "Bước 5",
          },
          {
            id: 7,
            title: "Bước 5",
          },
          {
            id: 7,
            title: "Bước 5",
          },
        ],
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

function Products(props) {
  // const [collapse, setCollapse] = useState(false);
  const [data, setData] = useState(initData);
  function renderList() {
    return (
      Array.isArray(data) &&
      data
        .filter((x) => x.id === 2)
        .map((text) => {
          return (
            <ul>
              {Array.isArray(text.titles) &&
                text.titles.map((item) => {
                  return (
                    <li>
                      {Array.isArray(item.details) &&
                        item.details.map((text) => {
                          return <Button key={text.id}>{text.title}</Button>;
                        })}
                    </li>
                  );
                })}
            </ul>
          );
        })
    );

    
  }
  function renderDetailsList() {
    return(
      <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
          ...
          <br />
          Really
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          long
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          content
          </div>
    )
  }

  return (
    <Layout>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <div className="header_fix">
          
          {renderList()}
        </div>
        <div className="site-layout-background" style={{ padding: 0 }}></div>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            backgroundColor: "#fff",
            paddingTop: "100px",
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            {renderDetailsList()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Products;
