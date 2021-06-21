import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  Select,
  Tooltip,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd] = useState(window.store.datarole);
  const [searchProduct, setSearchProduct] = useState("");
  const [visible, setVisible] = useState(false);

  const handleShowBox = () => {
    setVisible(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setVisible(false);
  };

  const ChangeBox = () => {
    setVisible(false);
  };

  const handleFormSubmit = () => {
    alert("Thay đổi trạng thái thành công!");
    setVisible(false);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Quản lý các quyền truy cập</h1>
        <Button
          type="primary"
          style={{ fontSize: 12, marginLeft: -500 }}
          onClick={handleShowBox}
        >
          Add
        </Button>
        <Input
          type="text"
          placeholder="Search ..."
          className="searchData"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>
      <div className="table_col">
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="table_col_header">
              <th>Title</th>
              <th>Description</th>
              <th>Activated</th>
              <th style={{ paddingLeft: 70 }}>Frontend</th>
              <th style={{ paddingLeft: 70 }}>Backend</th>
            </tr>
          </thead>
          {dataPd.length > 0
            ? dataPd.map((item, index) => (
                <>
                  <div style={{ marginBottom: 10 }}></div>
                  <tbody>
                    <tr
                      style={{ backgroundColor: "#e8ebef", width: "100%" }}
                      key={index}
                    >
                      <td style={{ textAlign: "center" }}>{item.title}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.description}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {String(item.activated) === "true" ? (
                          <CheckOutlined className="icon_active" />
                        ) : (
                          <CloseOutlined className="icon_deactive" />
                        )}
                      </td>
                      <td>
                        <>
                          {item.backends.length > 0
                            ? item.backends
                                .filter((val) => {
                                  if (searchProduct === "") {
                                    return val;
                                  } else if (
                                    val.title
                                      .toLowerCase()
                                      .includes(searchProduct.toLowerCase())
                                  ) {
                                    return val;
                                  }
                                })
                                .map((item) => (
                                  <tr>
                                    <Tooltip placement="top" title={item.description}>
                                      <td className="title_role"  >
                                        {item.title}
                                      </td>
                                    </Tooltip>
                                  </tr>
                                ))
                            : null}
                        </>
                      </td>
                      <td>
                        <>
                          {item.backends.length > 0
                            ? item.backends
                                .filter((val) => {
                                  if (searchProduct === "") {
                                    return val;
                                  } else if (
                                    val.title
                                      .toLowerCase()
                                      .includes(searchProduct.toLowerCase())
                                  ) {
                                    return val;
                                  }
                                })
                                .map((item) => (
                                  <tr>
                                    <Tooltip placement="top" title={item.description}>
                                      <td className="title_role"  >
                                        {item.title}
                                      </td>
                                    </Tooltip>
                                  </tr>
                                ))
                            : null}
                        </>
                      </td>
                    </tr>
                  </tbody>
                </>
              ))
            : null}
        </table>
        {visible && (
          <Modal
            visible={visible}
            title="Add new role"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form {...layout} name="control-hooks" onFinish={handleFormSubmit}>
              <Form.Item name="title" label="Title">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input />
              </Form.Item>
              <Form.Item name="activated" label="Activated">
                <Select>
                  <Select.Option value="true">True</Select.Option>
                  <Select.Option value="false">False</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="frontend" label="Frontend">
                <Input placeholder="Title" style={{ marginBottom: 10 }} />
                <Input placeholder="Description" />
              </Form.Item>

              <Form.Item name="backend" label="Backend">
                <Input placeholder="Title" style={{ marginBottom: 10 }} />
                <Input placeholder="Description" />
              </Form.Item>

              <div className="box_products">
                <Button key="submit" type="primary" htmlType="submit">
                  Add
                </Button>
                <Button type="danger" onClick={ChangeBox}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default TabData;
