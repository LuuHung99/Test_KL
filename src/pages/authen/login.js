import React from "react";
import "./css/login.css";
import LayoutPage from "../../components/layout";

import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login(props) {

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <LayoutPage >
      <div className="authen-container">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // onClick={onSubmit}
        >
          <img src="images/logo2.png" alt="" className="login-logo" />

          <h1>Đăng nhập</h1>
          <Form.Item
            label="Email"
            name="email"
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
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Mật khẩu không được để trống!",
              },
              // ({ getFieldValue }) => ({
              //   validator(_, value) {
              //     // if (!value || getFieldValue("password") === value) {
              //     //   return Promise.resolve();
              //     // }
              //     if (!value || getFieldValue("password") === value) {
              //       return Promise.resolve();
              //     }
              //     return Promise.reject("Mật khẩu không khớp!");
              //   },
              // }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <br />
          <Form.Item {...tailLayout}>
            <Button htmlType="submit" type="primary" >
              <Link to="dashbroad" className="button" >Đăng nhập</Link>
            </Button>
          </Form.Item>

          <p style={{ textAlign: "center" }}>
            Bạn chưa có tài khoản? <Link to="register" style={{color: "blue", fontWeight: 'bold'}}>Đăng ký</Link>
          </p>
          <div className="social-network-wrapper">
            <img src="images/facebook.png" alt="" className="logo-img" />
            <img src="images/google.png" alt="" className="logo-img" />
            <img src="images/phone.png" alt="" className="logo-img" />
          </div>
        </Form>
      </div>
    </LayoutPage>
  );
}

export default Login;
