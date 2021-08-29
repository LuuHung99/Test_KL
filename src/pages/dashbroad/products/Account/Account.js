import React, { useState } from "react";
import { Input, Form, Button, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useSelector } from "react-redux";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function UpdateActive(props) {
  const {
    showAccount,
    handleOk,
    handleCancel,
    ChangeBox,
    handleFormSubmit,
    fileList,
    onChangeUpLoad,
    onPreview,
  } = props;

  const data = useSelector((state) => state.auth);
  const [auth] = useState(data.user);

  return (
    <Modal
      visible={showAccount}
      title={`Chỉnh sửa thông tin người dùng ${auth.fullname} `}
      footer={[]}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        {...layout}
        name="control-hooks"
        onFinish={handleFormSubmit}
        // initialValues={auth}
      >
        <Form.Item name="avatarUrl" label="Hình ảnh">
          <ImgCrop rotate>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChangeUpLoad}
              onPreview={onPreview}
              defaultFileList={auth.avatarUrl}
            >
              {fileList.length < 1}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item name="fullname" label="Họ tên">
          <Input defaultValue={auth.fullname} />
        </Form.Item>
        <Form.Item name="username" label="Tên người dùng">
          <Input defaultValue={auth.username} />
        </Form.Item>
        <Form.Item name="hashedPass" label="Mật khẩu">
          <Input.Password defaultValue={auth.hashedPass} />
        </Form.Item>

        <div style={{ justifyContent: "center", display: "flex" }}>
          <Button key="submit" type="primary" htmlType="submit">
            Cập nhật
          </Button>
          <Button type="danger" onClick={ChangeBox}>
            Hủy bỏ
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateActive;
