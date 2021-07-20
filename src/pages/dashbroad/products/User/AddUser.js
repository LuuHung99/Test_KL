import React, { useState } from "react";
import { Input, Select, Form, Modal, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";

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
    handleAddInfor,
    ChangeBox,
    role,
  } = props;

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  return (
    <Modal
      visible={model}
      title="Thêm người dùng"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form {...layout} name="control-hooks" onFinish={handleFormSubmitAddUser}>
        <Form.Item
          name="image"
          label="Hình ảnh"
          rules={[
            {
              required: true,
              message: "Hình ảnh không được để trống!",
            },
          ]}
        >
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
          name="username"
          label="Họ tên"
          rules={[
            {
              required: true,
              message: "họ tên không được để trống!",
            },
          ]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="fullname"
          label="Tên tài khoản"
          rules={[
            {
              required: true,
              message: "Tên tài khoản không được để trống!",
            },
          ]}
        >
          <Input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
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
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() => handleAddInfor(username, fullname, role, fileList)}
          >
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
