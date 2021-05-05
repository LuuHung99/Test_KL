import React, {useState} from "react";
import "antd/dist/antd.css";
import './css/login.css';

import { Form, Input, Button, Checkbox } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

function Login(props) {
    const [isSuccess, setIsSuccess] = useState(true);

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    const onSubmit = (values) => {
      console.log("hello",values);
    }
    


  return (
    
    isSuccess ?
    <div className="authen-container">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onClick={onSubmit}
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
          <Button htmlType="submit" type="primary" className="button">
            <Link to="dashbroad">Đăng nhập</Link>
            
          </Button>
        </Form.Item>

        <p style={{ textAlign: "center" }}>
          Bạn chưa có tài khoản? <Link to="register">Đăng ký</Link>
        </p>
        <div className="social-network-wrapper">
          <img
            src="images/facebook.png"
            alt=""
            className="logo-img"
          />
          <img
            src="images/google.png"
            alt=""
            className="logo-img"
          />
          <img
            src="images/phone.png"
            alt=""
            className="logo-img"
          />
        </div>
      </Form>
    </div> : <Redirect to="product" />
  );
}

export default Login;
