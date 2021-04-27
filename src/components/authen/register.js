import React, {useState} from "react";
import "antd/dist/antd.css";
import "./css/login.css";
import Tools from "../Tools/Tools";
import { Form, Input, Button, Checkbox } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Register(props) {
  const [isSuccess, setIsSuccess] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);

    
  };
  const validatePhoneNumber = ({ getFieldValue }) => ({
    validator(_, value) {
      const result = Tools.checkPhoneNumber(value);
      if (!value || result) {
        return Promise.resolve();
      }
      return Promise.reject("Số điện thoại không đúng!");
    },
  });

  const signUp = () => {
      setIsSuccess(true);
      alert("Đăng ký tài khoản thành công");
  }

  return (
    isSuccess ? <Redirect to="/" /> :
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
          name="username"
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
          label="Địa chỉ Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email không được để trống!",
            },
            {
              type: "email",
              message: "Định dạng email không đúng!",
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
        <Form.Item
          label="Số điện thoại"
          name="phonenumber"
          rules={[
            {
              required: true,
              message: "Số điện thoại không được để trống!!",
            },
            validatePhoneNumber,
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button 
                htmlType="submit" 
                type="primary" 
                className="button"
            >
            Hoàn tất
          </Button>
        </Form.Item>
        <p style={{ textAlign: "center" }}>
          Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;
