import React, { useState, useEffect } from "react";
import { Input, Button, Tooltip, message } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import "../css/tab-data.css";
import UpdateActive from "../components/UpdateActive";
import AddUser from "./AddUser";
import UpdateUsers from "./UpdateUser";
import { useDispatch, useSelector } from "react-redux";
import {
  createUsers,
  getAllUsers,
  updateActivedUser,
  updateUser,
} from "../../../../redux/actions/user.action";

function User(props) {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.users.users);
  const activeRole = useSelector((state) => state.roles.activeRole);

  const [searchProduct, setSearchProduct] = useState("");
  const [visible, setVisible] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [model, setModel] = useState(false);
  const [dataRole, setDataRole] = useState();
  const [editSelected, setEditSelected] = useState();
  const [role, setRole] = useState();
  const [itemSelected, setItemSelected] = useState();

  const [fileList, setFileList] = useState([]);

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
    console.log("item", item);
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

  const handleFormSubmitAddUser = (value) => {
    const url = "http://localhost:3000/images/";
    let image = `${url}${fileList.length > 0 ? fileList[0].name : null}`;
    let user = dataUser.map((item) => item.username).indexOf(value.username);
    const l = {
      username: value.username,
      fullname: value.fullname,
      activated: true,
      roles: role,
      hashedPass: value.password,
      salt: "hung12",
      avatarUrl: image,
    };
    if (user === -1) {
      if (l.fullname && l.roles && l.avatarUrl) {
        dispatch(createUsers(l)).then((result) => {
          if (result) dispatch(getAllUsers());
        });
        setFileList([]);
        message.success("Thêm thành công người dùng", 2);
        setModel(false);
      }
    } else {
      message.error("Tài khoản đã tồn tại");
    }
  };

  const handleFormSubmitUpdateUser = async (value) => {
    let user = dataUser.map((item) => item.username).indexOf(value.username);
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

    if (user === -1) {
      dispatch(updateUser(request)).then((result) => {
        if (result) dispatch(getAllUsers());
      });
      message.success("Cập nhật thành công chức năng user", 2);
      setEditBox(false);
      setFileList([]);
    } else {
      message.error("Tên tài khoản đã tồn tại");
    }
  };

  const handleClickActive = async (id, activated, reason, username) => {
    const l = {
      userId: id,
      reason: reason,
      username: username,
      activated: activated ? false : true,
    };
    dispatch(updateActivedUser(l)).then((result) => {
      if (result) dispatch(getAllUsers());
    });
    message.success("Thay đổi thành công trạng thái chức năng user", 2);
    setVisible(false);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <h1 style={{ color: "green" }}>Bảng người dùng</h1>
        <Button
          type="primary"
          style={{ fontSize: 14, position: "absolute", left: 200 }}
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
          {dataUser
            ? dataUser
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
                      <td>{item.fullname}</td>
                      <td>{item.username}</td>
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
