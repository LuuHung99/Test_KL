import React, { useState, useEffect } from "react";
import { Tabs, Table, Tag, Button } from "antd";
import { ProductApi } from "../../../services/api";
import LayoutPage from "../../../components/layout";
import { CaretLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "title",
    key: "name",
  },
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Activated",
    key: "activated",
    dataIndex: "activated",

    render: (activated) =>
      activated && (
        <Tag
          color={activated == true ? "green" : "yellow"}
          style={{ width: 30, height: 2 }}
        >
          {/* {activated.toUpperCase()}  */}
        </Tag>
      ),
  },
  {
    title: "Author",
    key: "author",
    dataIndex: "author",
  },
];

function TabData(props) {
  const [dataPd, setDataPd] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await ProductApi();
      if (response) {
        setDataPd(response);
      }
    };
    getData();
  }, []);

  return (
    <LayoutPage>
      <div style={{ padding: "100px 100px", backgroundColor: "#fff" }}>
        <Table columns={columns} dataSource={dataPd} />
        <Link
          style={{
            backgroundColor: "#e6f7ff",
            color: "black",
            width: "auto",
            height: "auto",
            padding: "10px 20px",
          }}
          to="dashbroad"
        >
          <CaretLeftOutlined /> Dashbroad
        </Link>
      </div>
    </LayoutPage>
  );
}

export default TabData;
