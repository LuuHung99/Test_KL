import React, { useState, useEffect } from "react";
import { Input, Select, Form, Modal, Button, Tooltip,  } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./css/tab-data.css";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd] = useState(window.store.datauser);
  const [activeRole] = useState(window.store.activatedRole);
  const [searchProduct, setSearchProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [dataRole, setDataRole] = useState();
  const [role, setRole] = useState();
  const [model, setModel] = useState(false);
  const [itemSelected, setItemSelected] = useState();
  const [reason, setReason] = useState("");

  const handleShowBox = () => {
    setVisible(true);
  };

  const handleShowModel = (item) => {
    setItemSelected(item);
    console.log("item", item);
    setModel(true);
  }

  const handleOk = () => {};

  const handleCancel = () => {
    setVisible(false);
    setModel(false);
    
  };

  const ChangeBox = () => {
    setVisible(false);
    setModel(false);
  };

  const handleFormSubmit = () => {
    alert("Thêm mới thành công user");
    setVisible(false);
  };

  function handleChangeRole(value) {
    setRole(value);
  }

  useEffect(() => {
    if (activeRole) {
      const getData = activeRole.map((item) => {
        return { ...item, value: item.title };
      });
      setDataRole(getData);
    }
  }, []);

  const handleClickActive = (e) => {};

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng User</h1>
        <Button
          type="primary"
          style={{ fontSize: 14, marginLeft: -500 }}
          onClick={handleShowBox}
          icon={<PlusOutlined />}
        >
          Add new user
        </Button>
        <Input
          type="text"
          placeholder="Search ..."
          className="searchData"
          prefix={
            <SearchOutlined style={{ fontSize: "20px", color: "#8699ad" }} />
          }
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </div>
      <div className="table_col">
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="table_col_header">
              <th>Roles</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Activated</th>
              <th>Options</th>
            </tr>
          </thead>
          {dataPd
            ? dataPd
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
                .map((item, index) =>
                  item.username !== "" ? (
                    <>
                      <tr
                        className={
                          item.activated === true
                            ? "table_col_content_role"
                            : "table_col_content_unactivated_role"
                        }
                        
                        key={index}
                      >
                        <td>
                          {/* {item.roles.length > 0
                                ? item.roles.map((item) => (
                              <> */}
                          <Tooltip
                            placement="top"
                            title="ROle backend new add frontend"
                          >
                            <div className="title_user">
                              Hung new giao foods{" "}
                            </div>
                          </Tooltip>
                          {/* </>
                               ))
                               : null} */}
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
                        <td style={{ padding: "15px 0px" }}>
                          <tr>
                            <Button
                              style={{
                                backgroundColor: "#00acc1",
                                border: "none",
                                color: "white",
                              }}
                              icon={<FormOutlined />}
                              onClick={() => handleShowModel(item)}
                            >
                              Edit
                            </Button>
                          </tr>
                          <div style={{ marginBottom: 10 }}></div>
                          <tr>
                            <Button type="danger" icon={<DeleteOutlined />}>
                              Delete
                            </Button>
                          </tr>
                        </td>
                      </tr>
                    </>
                  ) : null
                )
            : null}
        </table>
        {visible && (
          <Modal
            visible={visible}
            title="Add new user"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form {...layout} name="control-hooks" onFinish={handleFormSubmit}>
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
              <Form.Item name="roles" label="Roles">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Add role"
                  onChange={handleChangeRole}
                  options={dataRole}
                  value={role}
                ></Select>
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
        {model && (
          <Modal
            visible={model}
            title={`${itemSelected.activated ? "Activated" : "Deactivated"} ${
              itemSelected.title
            }`}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form {...layout} name="control-hooks" onFinish={handleFormSubmit}>
              <h2>Lý do</h2>
              <TextArea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <div className="box_products">
                <Button
                  key="submit"
                  type={itemSelected.activated ? "ghost" : "primary"}
                  htmlType="submit"
                  onClick={() =>
                    handleClickActive(
                       
                    )
                  }
                >
                  {itemSelected.activated ? "Deactivated" : "Activated"}
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
