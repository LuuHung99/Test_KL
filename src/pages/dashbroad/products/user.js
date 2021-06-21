import React, { useState } from "react";
import { Input, Select, Form, Modal, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd] = useState(window.store.datauser);
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
        <h1 style={{ color: "green" }}>Bảng chức năng User</h1>
        <Button
          type="primary"
          style={{ fontSize: 12, marginLeft: -570 }}
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
            <tr className="table_col_header" style={{ textAlign: "center" }}>
              <th>Roles</th>
              <th>Username</th>
              <th>Fullname</th>
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
                    val.username
                      .toLowerCase()
                      .includes(searchProduct.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item, index) => (
                  <>
                    <div style={{ marginBottom: 10 }}></div>
                    <tbody>
                      <tr
                        style={{
                          backgroundColor: "#e8ebef",
                          textAlign: "center",
                        }}
                        key={index}
                      >
                        <td
                          style={{
                            display: "grid",
                            marginLeft: 30,
                          }}
                        >
                          <table cellpadding="10">
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.roles.length > 0
                                ? item.roles.map((item) => (
                                    <tr>
                                      <td>{item.title}</td>
                                      <td>{item.description}</td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </table>
                        </td>
                        <td>{item.username}</td>
                        <td>{item.fullname}</td>
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
              <Form.Item name="roles" label="Roles">
                <Input placeholder="Title" style={{marginBottom: 10}} />
                <Input placeholder="Description" />
              </Form.Item>
              <Form.Item name="username" label="Username">
                <Input />
              </Form.Item>
              <Form.Item name="fullname" label="Fullname">
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
