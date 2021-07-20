import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Tooltip,
  message
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import "../css/tab-data.css";
import {
  ActivateUser,
  UserApi,
  PushUser,
  UpdateUser,
} from "../../../../services/api";
import UpdateActive from "../components/UpdateActive";
import AddUser from "./AddUser";
import UpdateUsers from "./UpdateUser";

function User(props) {
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

  const [fileList, setFileList] = useState([]);

  const onChangeUpLoad = ({ fileList: newFileList }) => {
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
    setModel(true);
  };

  const handleShowModel = (item) => {
    setItemSelected(item);
    setVisible(true);
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

  const handleFormSubmitAddUser = () => {
    message.success("Thêm thành công chức năng user", 2);
    setModel(false);
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
    if (fileList.length > 0) {
      request.avatarUrl = `${url}${fileList[0].name}`;
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
  }, [activeRole]);

  const handleClickActive = async (id, activated, reason, username) => {
    const l = {
      userId: id,
      reason: reason,
      username: username,
      activated: activated ? false : true,
    };
    await ActivateUser(l);
    message.success("Thay đổi thành công trạng thái chức năng user", 2);
    setVisible(false);
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
      avatarUrl: `${url}${fileList[0].name}`,
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
        <h1 style={{ color: "green" }}>Bảng người dùng</h1>
        <Button
          type="primary"
          style={{ fontSize: 14, marginLeft: -600 }}
          onClick={handleShowBox}
          icon={<PlusOutlined />}
        >
          Thêm người dùng
        </Button>
        <Input
          type="text"
          placeholder="Tìm kiếm ..."
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
              <th>Hình ảnh</th>
              <th>Quyền truy cập</th>
              <th>Họ tên</th>
              <th>Tên tài khoản</th>
              <th>Trạng thái</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          {dataPd
            ? dataPd
                .filter((val) =>
                  val.username
                    .toLowerCase()
                    .includes(searchProduct.toLowerCase())
                    ? val
                    : null
                )
                .map((item, index) => (
                  <tbody key={index}>
                    <tr
                      className={
                        item.activated === true
                          ? "table_col_content_role"
                          : "table_col_content_unactivated_role"
                      }
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
                          ? item.roles.map((item, index) => (
                              <Tooltip
                                placement="top"
                                title={item.description}
                                key={index}
                              >
                                <div className="title_user">{item.title}</div>
                              </Tooltip>
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
                        <div
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
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
            : null}
        </table>

        {model && (
          <AddUser
            model={model}
            fileList={fileList}
            dataRole={dataRole}
            role={role}
            handleOk={handleOk}
            handleCancel={handleCancel}
            handleFormSubmitAddUser={handleFormSubmitAddUser}
            onChangeUpLoad={onChangeUpLoad}
            onPreview={onPreview}
            handleChangeRole={handleChangeRole}
            handleAddInfor={handleAddInfor}
            ChangeBox={ChangeBox}
          />
        )}

        {visible && (
          <UpdateActive
            visible={visible}
            handleCancel={handleCancel}
            handleOk={handleOk}
            handleClickActive={handleClickActive}
            ChangeBox={ChangeBox}
            itemSelected={itemSelected}
          />
        )}

        {editBox && (
          <UpdateUsers
            editBox={editBox}
            editSelected={editSelected}
            dataRole={dataRole}
            fileList={fileList}
            handleOk={handleOk}
            handleCancel={handleCancel}
            handleFormSubmitUpdateUser={handleFormSubmitUpdateUser}
            onChangeUpLoad={onChangeUpLoad}
            onPreview={onPreview}
            handleChangeRole={handleChangeRole}
            ChangeBox={ChangeBox}
          />
        )}
      </div>
    </div>
  );
}

export default User;
