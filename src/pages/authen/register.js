import React, { useState, useEffect } from "react";
import "./css/login.css";
import Tools from "../../Tools/Tools";
import LayoutPage from "../../components/layout";
import { Form, Input, Button, message } from "antd";
import { Link, Redirect } from "react-router-dom";
import { UserApi, PushUser } from "../../services/api";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Register(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const tokenUser = window.store.datauser;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const signUp = async (value) => {
    const username = value.username;
    const fullname = value.fullname;
    const password = value.password;

    const l = {
      username: username,
      fullname: fullname,
      activated: true,
      hashedPass: password,
      salt: "hung12",
      avatarUrl: "http://localhost:3000/images/download.png",
    };

    const user = tokenUser.map((item) => item.username).indexOf(value.username);

    if (user === -1) {
      await PushUser(l);

      message.success("Đăng ký tài khoản thành công", 2);
      setIsSuccess(true);
      const newData = await UserApi();
      window.store["datauser"] = newData;
    } else {
      message.error("Tài khoản đã tồn tại. Xin mời nhập lại!", 2);
    }
  };

  return (
    <LayoutPage>
      {isSuccess ? (
        <Redirect to="/" />
      ) : (
        <div className="authen-container">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={signUp}
            onFinishFailed={onFinishFailed}
          >
            <img src="images/logo2.png" alt="" className="login-logo" />

            <h1>Đăng ký</h1>
            <Form.Item
              label="Họ tên"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Họ tên không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên tài khoản"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Tên tài khoản không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!getFieldValue("password")) {
                      return Promise.reject("Mật khẩu không được để trống!");
                    }
                    if (Tools.requireStrongPw(getFieldValue("password"))) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu quá yếu");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại"
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Nhập lại mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu không khớp!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                htmlType="submit"
                type="primary"
                className="button_authen"
              >
                Hoàn tất
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              Bạn đã có tài khoản?
              <Link to="/" style={{ marginLeft: 5 }}>
                Đăng nhập
              </Link>
            </p>
          </Form>
        </div>
      )}
    </LayoutPage>
  );
}

export default Register;
