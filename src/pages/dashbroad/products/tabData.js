import React, { useState } from "react";
import { Input, Form, Button, Modal, message } from "antd";
import {
  FrontendToFuncLog,
  pushActiveFrontend,
  ProductApi,
  UpdateFrontend,
} from "../../../services/api";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import "./css/tab-data.css";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd, setDataPd] = useState(window.store.datatab);
  const [visible, setVisible] = useState(false);
  const [model, setModel] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [itemSelected, setItemSelected] = useState();
  const [editSelected, setEditSelected] = useState();

  const [reason, setReason] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const handleShowBox = (item) => {
    setVisible(true);
    setItemSelected(item);
  };

  const handleEditBox = (item) => {
    setEditSelected(item);
    setEditBox(true);
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
    setVisible(false);
    setModel(false);
    setEditBox(false);
  };

  // const handleFormSubmit = () => {
  //   message.success("Cập nhật thành công trạng thái chức năng frontend", 2);
  //   setVisible(false);
  // };

  // const handleFromAddFrontend = () => {
  //   message.success("Thêm thành công chức năng frontend", 2);
  //   setModel(false);
  // };

  const handleFormSubmitUpdateFrontend = async (value) => {
    const request = { _id: editSelected._id };

    if (value["url"] !== undefined) {
      request.url = value["url"];
    }
    if (value["title"] !== undefined) {
      request.title = value["title"];
    }
    if (value["description"] !== undefined) {
      request.description = value["description"];
    }
    if (value["author"] !== undefined) {
      request.author = value["author"];
    }
    await UpdateFrontend(request);
    message.success("Cập nhật thành công chức năng frontend", 2);
    setEditBox(false);
    const newData = await ProductApi();
    window.store["datatab"] = newData;
    setDataPd(newData);
    
  };

  const handleAddInfor = async (title, url, description, author) => {
    const f = {
      title: title,
      url: url,
      description: description,
      activated: true,
      author: author,
      parentId: "",
    };
    await pushActiveFrontend(f);
    message.success("Thêm thành công chức năng frontend", 2);
    setModel(false);
    const newData = await ProductApi();
    window.store["datatab"] = newData;
    setDataPd(newData);
    
  };

  const handleClickActive = async (id, active, author, value) => {
    const l = {
      funcId: id,
      funcType: "frontend",
      reason: value,
      username: author,
      activated: active ? false : true,
    };
    await FrontendToFuncLog(l);
    setReason("");
    message.success("Cập nhật thành công trạng thái chức năng frontend", 2);
    setVisible(false);
    const newData = await ProductApi();
    window.store["datatab"] = newData;
    setDataPd(newData);
    
  };

  return (
    <div className="container_tabdata">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "green" }}>Bảng chức năng Frontend</h1>
        <Button
          type="primary"
          style={{ fontSize: 14, marginLeft: -450 }}
          onClick={handleShowModel}
          icon={<PlusOutlined />}
        >
          Add new frontend
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
              <th>Url</th>
              <th>Description</th>
              <th>Activated</th>
              <th>Author</th>
              <th>Options</th>
            </tr>
          </thead>
          {dataPd.length > 0
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
                .map((item, index) =>
                  item.description !== "" ? (
                    <>
                      <tbody key={index}>
                        <tr
                          className={
                            item.activated === true
                              ? "table_col_content"
                              : "table_col_content_unactivated"
                          }
                        >
                          <td>{item.title}</td>
                          <td>{item.url}</td>
                          <td>{item.description}</td>
                          <td onClick={() => handleShowBox(item)}>
                            {String(item.activated) === "true" ? (
                              <CheckOutlined className="icon_active" />
                            ) : (
                              <CloseOutlined className="icon_deactive" />
                            )}
                          </td>
                          <td>{item.author}</td>
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
                  ) : null
                )
            : null}
        </table>
        {visible && (
          <Modal
            visible={visible}
            title={`${itemSelected.activated ? "Activated" : "Disable"} ${
              itemSelected.title
            }`}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form {...layout} name="control-hooks" >
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
                  {itemSelected.activated ? "Disable" : "Active"}
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
            title="Add new frontend"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form
              {...layout}
              name="control-hooks"
              
            >
              <Form.Item name="title" label="Title">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="url" label="Url">
                <Input value={url} onChange={(e) => setUrl(e.target.value)} />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <TextArea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="author" label="Author">
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Item>

              <div className="box_products">
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  onClick={() =>
                    handleAddInfor(title, url, description, author)
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

        {editBox && (
          <Modal
            visible={editBox}
            title={`Update Tab ${editSelected.title}`}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form
              {...layout}
              name="control-hooks"
              onFinish={handleFormSubmitUpdateFrontend}
            >
              <Form.Item name="title" label="Title">
                <Input
                  defaultValue={editSelected.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="url" label="Url">
                <Input
                  defaultValue={editSelected.url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="author" label="Author">
                <Input
                  defaultValue={editSelected.author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea
                  rows={4}
                  defaultValue={editSelected.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>

              <div className="box_products">
                <Button key="submit" type="primary" htmlType="submit">
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
