import React, { useState } from "react";
import { Layout, Col, message } from "antd";
import "./css/hd.css";
import {
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Account from "./Account/Account";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, getAllUsers } from "../../../redux/actions/user.action";

const { Header } = Layout;
function HeaderTest(props) {
  const data = useSelector((state) => state.auth);
  const [auth] = useState(data.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();

  // const users = window.store.datauser;
  const users = useSelector((state) => state.users.users);
  const tokenUser = JSON.parse(window.localStorage.user);

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

  const handleFormSubmit = async (value) => {
    let user = users.map((item) => item.username).indexOf(value.username);
    const url = "http://localhost:3000/images/";
    const request = { _id: auth._id };
    if (value["username"] !== undefined) {
      request.username = value["username"];
    }

    if (value["fullname"] !== undefined) {
      request.fullname = value["fullname"];
    }
    if (value["hashedPass"] !== undefined) {
      request.hashedPass = value["hashedPass"];
    }
    if (fileList.length > 0) {
      request.avatarUrl = `${url}${fileList[0].name}`;
    }

    if (user === -1) {
      dispatch(updateUser(request)).then((result) => {
        if (result) dispatch(getAllUsers());
      });
      message.success("Cập nhật thông tin người dùng thành công", 2);
      setShowAccount(false);
      setFileList([]);
    } else {
      message.error("Tài khoản đã tồn tại. Xin mời nhập lại!", 2);
    }
  };

  const showAccounts = () => {
    setShowAccount(true);
  };

  const handleOk = () => {
    setShowAccount(false);
  };

  const handleCancel = () => {
    setShowAccount(false);
  };

  const ChangeBox = () => {
    setShowAccount(false);
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    message.success("Đăng xuất thành công!", 2);
  };

  return (
    <>
      <Header className="headerPd">
        <Col className="header__block">
          <div className="header__logo">
            <img src="/images/logo.svg" className="header__img" alt="" />
          </div>
          <div className="header__name">Học viện nông nghiệp việt nam</div>
          <div className="header__logo2">
            <img src="/images/logo.svg" className="header__img" alt="" />
          </div>

          <div className="header_menu">
            {!showMenu ? (
              <MenuOutlined onClick={() => setShowMenu(true)} />
            ) : (
              <CloseOutlined onClick={() => setShowMenu(false)} />
            )}
          </div>
        </Col>
        {showMenu ? (
          <div id="menuToggle">
            <ul className="menu">
              <div className="menu-logo">
                <img
                  src={tokenUser.avatarUrl}
                  alt=""
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <p style={{ textTransform: "capitalize" }}>
                  {tokenUser.fullname}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  paddingBottom: 5,
                  paddingTop: 5,
                }}
              >
                <li className="profile_menu">
                  <div>
                    <UserOutlined />
                  </div>
                  <div onClick={showAccounts}>Edit profile</div>
                </li>
                <li className="profile_menu">
                  <div>
                    <LogoutOutlined />
                  </div>
                  <Link onClick={handleLogOut} to="">
                    Đăng xuất
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        ) : null}
      </Header>
      {showAccount && (
        <Account
          showAccount={showAccount}
          handleOk={handleOk}
          handleCancel={handleCancel}
          ChangeBox={ChangeBox}
          handleFormSubmit={handleFormSubmit}
          fileList={fileList}
          onChangeUpLoad={onChangeUpLoad}
          onPreview={onPreview}
        />
      )}
    </>
  );
}

export default HeaderTest;
