import React, { useState } from "react";
import { Input, Select, Form, Modal, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Tools from "../../../../Tools/Tools";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function AddUser(props) {
  const {
    model,
    handleCancel,
    handleOk,
    handleFormSubmitAddUser,
    fileList,
    onChangeUpLoad,
    onPreview,
    handleChangeRole,
    dataRole,
    ChangeBox,
    role,
  } = props;

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal
      visible={model}
      title="Thêm người dùng"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form {...layout} name="control-hooks" onFinish={handleFormSubmitAddUser}>
        <Form.Item name="image" label="Hình ảnh">
          <ImgCrop rotate>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChangeUpLoad}
              onPreview={onPreview}
              status="uploading"
            >
              {fileList.length < 1 && "+ Thêm ảnh"}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item
          name="fullname"
          label="Họ tên"
          rules={[
            {
              required: true,
              message: "Họ tên không được để trống!",
            },
          ]}
        >
          <Input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="username"
          label="Tên tài khoản"
          rules={[
            {
              required: true,
              message: "Tên tài khoản không được để trống!",
            },
          ]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          className="input_info"
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
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="roles"
          label="Quyền truy cập"
          rules={[
            {
              required: true,
              message: "Quyền truy cập không được để trống!",
            },
          ]}
        >
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
          <Button key="submit" type="primary" htmlType="submit">
            Thêm mới
          </Button>
          <Button type="danger" onClick={ChangeBox}>
            Hủy bỏ
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddUser;
