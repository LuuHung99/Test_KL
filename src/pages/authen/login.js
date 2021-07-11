import React, { useState } from "react";
import "./css/login.css";
import LayoutPage from "../../components/layout";

import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { PostLogin } from "../../services/api";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //username: admin
  //password: abc123

  const history = useHistory();

  const handleSubmit = async () => {
    const account = { username, password, _app_secretKey: "secretKey" };
    const res = await PostLogin(account);
    if(res) {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
     
      const key = "updatable";
      if (window.localStorage.token) {
        setTimeout(() => {
          message.success({ content: "Đăng nhập thành công", key, duration: 2 });
          history.push("dashboard");
        }, 1500);
      } 
    }
  };

  return (
    <LayoutPage>
      <React.Fragment>
        <div className="authen-container">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <img src="/images/logo2.png" alt="" className="login-logo" />

            <h1>Đăng nhập</h1>
            <Form.Item
              className="input_info"
              label="Tài khoản"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Email không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="input_info"
              label="Mật khẩu"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button
                onClick={handleSubmit}
                htmlType="submit"
                type="primary"
                className="button_authen"
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              Bạn chưa có tài khoản?
              <Link to="register" style={{ marginLeft: 5 }}>
                Đăng ký
              </Link>
            </p>
            <div className="social-network-wrapper">
              <img src="/images/facebook.png" alt="" className="logo-img" />
              <img src="/images/google.png" alt="" className="logo-img" />
              <img src="/images/phone.png" alt="" className="logo-img" />
            </div>
          </Form>
        </div>
      </React.Fragment>
    </LayoutPage>
  );
}

export default Login;
