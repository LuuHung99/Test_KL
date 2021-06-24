import React, { useState } from "react";
import { Input, Form, Button, Modal, Select } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./css/tab-data.css";
import {GetResourceApi, ResourceApi, pushActiveBackend} from "../../../services/api";

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
  const [reason, setReason] = useState("");
  const [itemSelected, setItemSelected] = useState();
  const [title, setTitle] = useState("");
  const [path, setPath] = useState("");
  const [http, setHTTP] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState("");
  
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
  };

  const ChangeBox = () => {
    setModel(false);
    setVisible(false);
  };

  const handleFormSubmit = () => {
    alert("Thay đổi trạng thái thành công!");
    setModel(false);
    setVisible(false);
  };

  const handleClickActive = async (id, active, value ) => {
    const l = {
      funcId: id,
      funcType: "backend",
      reason: value,
      username: "Root admin",
      activated: active ? false : true,
    };
    await GetResourceApi(l);
    setReason("");
    const newData = await ResourceApi();
    window.store["dataresource"] = newData;
    setDataPd(newData);
  };

  const handleAddInfor = async (title, http, description, active, path) => {
    const f = {
      title: title,
      description: description,
      activated: true,
      httpVerb: "GET",
      locationPath: path
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
          style={{ fontSize: 12, marginLeft: -500 }}
          onClick={handleShowModel}
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
                          onClick={() => handleShowBox(item)}
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
        {model && (
          <Modal
          visible={model}
          title="Add new role"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <Form {...layout} name="control-hooks" onFinish={handleFormSubmit}>
            <Form.Item name="title" label="Title">
              <Input value= {title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item name="path" label="LocationPath">
              <Input value={path} onChange={(e) => setPath(e.target.value)}/>
            </Form.Item>
            <Form.Item name="http" label="HttpVerb">
              <Select value={http}  >
                <Select.Option value="get">GET</Select.Option>
                <Select.Option value="put">PUT</Select.Option>
                <Select.Option value="post">POST</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>

            <Form.Item name="activated" label="Activated">
                <Select value={active} >
                  <Select.Option value="true">True</Select.Option>
                  <Select.Option value="false">False</Select.Option>
                </Select>
              </Form.Item>
             
            <div className="box_products">
              <Button 
                key="submit" 
                type="primary" 
                htmlType="submit"
                onClick={() =>
                  handleAddInfor(title, http, description, active, path)
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
      </div>
    </div>
  );
}

export default TabData;
