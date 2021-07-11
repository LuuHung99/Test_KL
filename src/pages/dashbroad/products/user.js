import React, { useState, useEffect } from "react";
import {
  Input,
  Select,
  Form,
  Modal,
  Button,
  Tooltip,
  Upload,
  message,
} from "antd";
import ImgCrop from "antd-img-crop";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import "./css/tab-data.css";

import {
  ActivateUser,
  UserApi,
  PushUser,
  UpdateUser,
} from "../../../services/api";

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function TabData(props) {
  const [dataPd, setDataPd] = useState(window.store.datauser);
  const [activeRole] = useState(window.store.activatedRole);
  const [searchProduct, setSearchProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [model, setModel] = useState(false);
  const [dataRole, setDataRole] = useState();
  const [editSelected, setEditSelected] = useState();
  const [role, setRole] = useState();
  const [itemSelected, setItemSelected] = useState();
  const [reason, setReason] = useState("");

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.name;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleEditBox = (item) => {
    setEditSelected(item);
    setEditBox(true);
  };

  const handleShowBox = () => {
    setVisible(true);
  };

  const handleShowModel = (item) => {
    setItemSelected(item);
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

  const handleFormSubmit = () => {
    message.success("Thay đổi thành công trạng thái chức năng user", 2);
    setModel(false);
  };

  const handleFormSubmitAddUser = () => {
    message.success("Thêm thành công chức năng user", 2);
    setVisible(false);
  };

  const handleFormSubmitUpdateUser = async (value) => {
    const url = "http://localhost:3000/images/";
    const request = { _id: editSelected._id };
    if (value["username"] !== undefined) {
      request.username = value["username"];
    }
    if (value["fullname"] !== undefined) {
      request.fullname = value["fullname"];
    }
    if (role !== undefined) {
      request.roles = role;
    }
    if (fileList !== undefined) {
      request.avatarUrl = `${url}` + `${fileList[0].name}`;
    }

    await UpdateUser(request);
    message.success("Thay đổi thành công chức năng user", 2);
    setEditBox(false);
    setFileList([]);
    const newData = await UserApi();
    window.store["datauser"] = newData;
    setDataPd(newData);
  };

  const handleChangeRole = (user, id) => {
    const newId = id.map((item) => item._id);
    setRole(newId);
  };

  useEffect(() => {
    if (activeRole) {
      const getData = activeRole.map((item) => {
        return { ...item, value: item.title };
      });
      setDataRole(getData);
    }
  }, []);

  const handleClickActive = async (id, activated, reason, username) => {
    const l = {
      userId: id,
      reason: reason,
      username: username,
      activated: activated ? false : true,
    };
    await ActivateUser(l);
    setReason("");
    const newData = await UserApi();
    window.store["datauser"] = newData;
    setDataPd(newData);
  };

  const handleAddInfor = async (username, fullname, role, fileList) => {
    const url = "http://localhost:3000/images/";
    const l = {
      username: username,
      fullname: fullname,
      activated: true,
      roles: role,
      hashedPass: "abc123",
      salt: "hung12",
      avatarUrl: `${url}` + `${fileList[0].name}`,
    };
    await PushUser(l);
    setFileList([]);
    const newData = await UserApi();
    window.store["datauser"] = newData;
    setDataPd(newData);
  };

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
              <th>Image</th>
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
                .map((item, index) => (
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
                        <img
                          src={item.avatarUrl}
                          alt=""
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>
                        {item.roles.length > 0
                          ? item.roles.map((item) => (
                              <>
                                <Tooltip placement="top" title={item.title}>
                                  <div className="title_user">
                                    {item.description}
                                  </div>
                                </Tooltip>
                              </>
                            ))
                          : null}
                      </td>
                      <td>{item.username}</td>
                      <td>{item.fullname}</td>
                      <td onClick={() => handleShowModel(item)}>
                        {String(item.activated) === "true" ? (
                          <CheckOutlined className="icon_active" />
                        ) : (
                          <CloseOutlined className="icon_deactive" />
                        )}
                      </td>
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
                  </>
                ))
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
            <Form
              {...layout}
              name="control-hooks"
              onFinish={handleFormSubmitAddUser}
            >
              <Form.Item name="image" label="Image">
                <ImgCrop rotate>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    status="uploading"
                  >
                    {fileList.length < 1 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item name="username" label="Username">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="fullname" label="Fullname">
                <Input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="roles" label="Role">
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
                <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  onClick={() =>
                    handleAddInfor(username, fullname, role, fileList)
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
            title={`${itemSelected.activated ? "Activate" : "Disable"} ${
              itemSelected.username
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
                      reason,
                      itemSelected.username
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

        {editBox && (
          <Modal
            visible={editBox}
            title={`Update user ${editSelected.username}`}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form
              {...layout}
              name="control-hooks"
              onFinish={handleFormSubmitUpdateUser}
            >
              <Form.Item name="image" label="Image">
                <ImgCrop rotate>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    defaultFileList={[editSelected.avatarUrl]}
                  >
                    {fileList.length < 1}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Form.Item name="username" label="Username">
                <Input
                  defaultValue={editSelected.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="fullname" label="Fullname">
                <Input
                  defaultValue={editSelected.fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="roles" label="Role">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Add role"
                  onChange={handleChangeRole}
                  options={dataRole}
                  value={role}
                  defaultValue={editSelected.roles.map((item) => item.title)}
                ></Select>
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
