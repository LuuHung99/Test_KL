import React, { useState } from "react";
import { Input, Form, Button, Modal, Select } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd] = useState(window.store.dataresource);
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
    <div className="container_tabdata">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng Backend</h1>
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
              <th>LocationPath</th>
              <th>HttpVerb</th>
              <th>Description</th>
              <th>Activated</th>
            </tr>
          </thead>
          {dataPd.length > 0
            ? dataPd
                // eslint-disable-next-line array-callback-return
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
                .map((item, index) =>
                  item.description !== "" ? (
                    <>
                      <div style={{ marginBottom: 10 }}></div>
                      <tbody>
                        <tr
                          className={
                            item.activated === true
                              ? "table_col_content"
                              : "table_col_content_unactivated"
                          }
                         
                          key={index}
                        >
                          <td>{item.title}</td>
                          <td>{item.locationPath}</td>
                          <td>{item.httpVerb}</td>
                          <td>{item.description}</td>
                          <td>
                            {String(item.activated) === "true" ? (
                              <CheckOutlined className="icon_active" />
                            ) : (
                              <CloseOutlined className="icon_deactive" />
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </>
                  ) : null
                )
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
            <Form.Item name="path" label="LocationPath">
              <Input  />
            </Form.Item>
            <Form.Item name="http" label="HttpVerb">
              <Select>
                <Select.Option value="get">GET</Select.Option>
                <Select.Option value="put">PUT</Select.Option>
                <Select.Option value="post">POST</Select.Option>
              </Select>
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
