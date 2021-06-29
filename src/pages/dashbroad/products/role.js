import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Form, Select, Tooltip } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./css/tab-data.css";
import { pushRole, RoleApi } from "../../../services/api";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd, setDataPd] = useState(window.store.datarole);
  const [dataActiveFe] = useState(window.store.activatedFe);
  const [dataActiveBe] = useState(window.store.activatedBe);
  const [searchProduct, setSearchProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(false);
  const [itemSelected, setItemSelected] = useState();
  const [dataBackend, setDataBackend] = useState();
  const [dataFrontend, setDataFrontend] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState("");
  const [frontend, setFrontend] = useState();
  const [backend, setBackend] = useState();

  const [reason, setReason] = useState("");
  const [username, setUsername] = useState("");

  const handleShowBox = () => {
    setVisible(true);
  };

  const handleShowModel = (item) => {
    setItemSelected(item);
    console.log("item", item);
    setModel(true);
  };

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
    alert("Tạo mới thành công quyền truy cập");
    setVisible(false);
    setModel(false);
  };

  function handleChangeFrontend(frontend, id) {
    console.log(id);
    const newId = id.map((item) => item._id);
    setFrontend(newId);
  }

  function handleChangeBackend(backend, id) {
    console.log(id);
    const newId = id.map((item) => item._id);
    setBackend(newId);
  }

  useEffect(() => {
    if (dataActiveBe) {
      const getDataBe = dataActiveBe.map((item) => {
        return { ...item, value: item.title };
      });
      setDataBackend(getDataBe);
    }
  }, []);

  useEffect(() => {
    if (dataActiveFe) {
      const getDataFe = dataActiveFe.map((item) => {
        return { ...item, value: item.title };
      });

      setDataFrontend(getDataFe);
    }
  }, []);

  const handleAddInfor = async (
    title,
    description,
    active,
    frontend,
    backend
  ) => {
    const f = {
      title: title,
      description: description,
      activated: true,
      tabs: frontend,
      backends: backend,
    };
    await pushRole(f);
    const newDataRole = await RoleApi();
    window.store["datarole"] = newDataRole;
    setDataPd(newDataRole);
  };

  const handleClickActive = (e) => {};

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Quản lý các quyền truy cập</h1>
        <Button
          type="primary"
          style={{ fontSize: 14, marginLeft: -450 }}
          onClick={handleShowBox}
          icon={<PlusOutlined />}
        >
          Add new role
        </Button>
        <Input
          type="text"
          placeholder="Search ..."
          className="searchData"
          value={searchProduct}
          prefix={
            <SearchOutlined style={{ fontSize: "20px", color: "#8699ad" }} />
          }
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
              <th>Frontend</th>
              <th>Backend</th>
              <th>Options</th>
            </tr>
          </thead>
          {dataPd
            ? dataPd
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
                .map((item, index) => (
                  <>
                    <tbody>
                      <tr
                        className={
                          item.activated === true
                            ? "table_col_content_role"
                            : "table_col_content_unactivated_role"
                        }
                        key={index}
                        
                      >
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          {String(item.activated) === "true" ? (
                            <CheckOutlined className="icon_active" />
                          ) : (
                            <CloseOutlined className="icon_deactive" />
                          )}
                        </td>
                        <td>
                          <>
                            {item.tabs
                              ? item.tabs.map((item) => (
                                  <>
                                    <Tooltip
                                      placement="top"
                                      title={item.description}
                                    >
                                      <div
                                        className="title_role"
                                        style={{ paddingLeft: 70 }}
                                      >
                                        {item.title}
                                      </div>
                                    </Tooltip>
                                  </>
                                ))
                              : null}
                          </>
                        </td>
                        <td>
                          <>
                            {item.backends
                              ? item.backends.map((item) => (
                                  <>
                                    <Tooltip
                                      placement="top"
                                      title={item.description}
                                    >
                                      <div className="title_role">
                                        {item.title}
                                      </div>
                                    </Tooltip>
                                  </>
                                ))
                              : null}
                          </>
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
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="activated" label="Activated">
                <Select value={active}>
                  <Select.Option value="active">Activate</Select.Option>
                  <Select.Option value="disable">Disabled</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="tab" label="Frontend">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Tag frontend"
                  onChange={handleChangeFrontend}
                  options={dataFrontend}
                  value={frontend}
                ></Select>
              </Form.Item>

              <Form.Item name="backend" label="Backend">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Tag backend"
                  onChange={handleChangeBackend}
                  options={dataBackend}
                  value={backend}
                ></Select>
              </Form.Item>

              <div className="box_products">
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  onClick={() =>
                    handleAddInfor(
                      title,
                      description,
                      active,
                      frontend,
                      backend
                    )
                  }
                >
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
                      itemSelected._id,
                      itemSelected.activated,
                      itemSelected.author,
                      reason
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
