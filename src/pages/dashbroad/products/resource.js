import React, { useState } from "react";
import { Input, Form, Button, Modal, Select } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import "./css/tab-data.css";
import {
  BackendToFuncLog,
  ResourceApi,
  pushActiveBackend,
  UpdateBackend
} from "../../../services/api";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd, setDataPd] = useState(window.store.dataresource);
  const [searchProduct, setSearchProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [reason, setReason] = useState("");
  const [itemSelected, setItemSelected] = useState();
  const [editSelected, setEditSelected] = useState();
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [http, setHTTP] = useState("");
  const [description, setDescription] = useState("");

  const handleEditBox = (item) => {
    setEditSelected(item);
    setEditBox(true);
  };

  const handleShowBox = (item) => {
    setVisible(true);
    setItemSelected(item);
  };

  const handleShowModel = () => {
    setModel(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setVisible(false);
    setModel(false);
    setEditBox(false);
  };

  const ChangeBox = () => {
    setModel(false);
    setVisible(false);
    setEditBox(false);
  };

  const handleFormSubmit = () => {
    alert("Thay đổi trạng thái thành công!");
    setModel(false);
    setVisible(false);
  };

  const handleFormSubmitUpdateFrontend = async (value) => {
    const request = { _id: editSelected._id };

    if (value["title"] !== undefined) {
      request.title = value["title"];
    }
    if (value["description"] !== undefined) {
      request.description = value["description"];
    }
    if (value["http"] !== undefined) {
      request.httpVerb = value["http"];
    }
    if (value["path"] !== undefined) {
      request.httpVerb = value["path"];
    }
    await UpdateBackend(request);
    const newData = await ResourceApi();
    window.store["dataresource"] = newData;
    setDataPd(newData);
    setEditBox(false);
  };


  const handleClickActive = async (id, active, value) => {
    const l = {
      funcId: id,
      funcType: "backend",
      reason: value,
      username: "Root admin",
      activated: active ? false : true,
    };
    await BackendToFuncLog(l);
    setReason("");
    const newData = await ResourceApi();
    window.store["dataresource"] = newData;
    setDataPd(newData);
  };

  const handleAddInfor = async (title, http, description, path) => {
    const f = {
      title: title,
      description: description,
      activated: true,
      httpVerb: "GET",
      locationPath: path,
    };
    await pushActiveBackend(f);
    const newData = await ResourceApi();
    window.store["dataresource"] = newData;
    setDataPd(newData);
  };

  return (
    <div className="container_tabdata">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng Backend</h1>
        <Button
          type="primary"
          style={{ fontSize: 14, marginLeft: -450 }}
          onClick={handleShowModel}
          icon={<PlusOutlined />}
        >
          Add new resource
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
              <th>Title</th>
              <th>LocationPath</th>
              <th>HttpVerb</th>
              <th>Activated</th>
              <th>Description</th>
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
                            ? "table_col_content"
                            : "table_col_content_unactivated"
                        }
                        key={index}
                      >
                        <td>{item.title}</td>
                        <td>{item.locationPath}</td>
                        <td>{item.httpVerb}</td>
                        <td onClick={() => handleShowBox(item)}>
                          {String(item.activated) === "true" ? (
                            <CheckOutlined className="icon_active" />
                          ) : (
                            <CloseOutlined className="icon_deactive" />
                          )}
                        </td>
                        <td>{item.description}</td>

                        <td>
                          <tr
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              style={{
                                backgroundColor: "#00acc1",
                                border: "none",
                                color: "white",
                              }}
                              icon={<FormOutlined />}
                              onClick={() => handleEditBox(item)}
                            >
                              Edit
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
            title={`${itemSelected.activated ? "Activate" : "Disable"} ${
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
                  type={itemSelected.activated ? "" : "primary"}
                  htmlType="submit"
                  onClick={() =>
                    handleClickActive(
                      itemSelected._id,
                      itemSelected.activated,
                      reason
                    )
                  }
                >
                  {itemSelected.activated ? "Disable" : "Activate"}
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
            title="Add new backend"
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
              <Form.Item name="path" label="LocationPath">
                <Input value={path} onChange={(e) => setPath(e.target.value)} />
              </Form.Item>
              <Form.Item name="http" label="HttpVerb">
                <Select value={http}>
                  <Select.Option value="get">GET</Select.Option>
                  <Select.Option value="put">PUT</Select.Option>
                  <Select.Option value="post">POST</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="description" label="Description">
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>

              <div className="box_products">
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  onClick={() => handleAddInfor(title, http, description, path)}
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

        {editBox && (
          <Modal
            visible={editBox}
            title={`Update Resource ${editSelected.title}`}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form {...layout} name="control-hooks" onFinish={handleFormSubmitUpdateFrontend}>
              <Form.Item name="title" label="Title">
                <Input
                  defaultValue={editSelected.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="path" label="LocationPath">
                <Input
                  defaultValue={editSelected.locationPath}
                  onChange={(e) => setPath(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="http" label="HttpVerb">
                <Select defaultValue={editSelected.httpVerb}>
                  <Select.Option value="get">GET</Select.Option>
                  <Select.Option value="put">PUT</Select.Option>
                  <Select.Option value="post">POST</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea
                  rows={4}
                  defaultValue={editSelected.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>

              <div className="box_products">
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  // onClick={() => handleUpdateBackend(title, http, description, path)}
                >
                  Update
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
